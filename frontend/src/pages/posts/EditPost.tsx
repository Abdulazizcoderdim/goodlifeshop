import Modal from "@/components/admin-panel/modal/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";
import { PostCategory, type IPosts } from "@/types";
import { useState } from "react";
import { useImageUploader } from "@/hooks/useImageUploader";
import api from "@/http/axios";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";

interface Props {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: IPosts;
  onSuccess: (page: string) => void;
}

const EditPost = ({ setIsEditModalOpen, defaultValues, onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    title: defaultValues.title,
    category: defaultValues.category,
    imageUrl: defaultValues.imageUrl,
    content: defaultValues.content,
  });

  const { uploadImage, uploading, error: uploadError } = useImageUploader();
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await api.put(`/posts/${defaultValues.id}`, formData);
      if (res.data) {
        toast.success("Сообщение успешно обновлено");
      }
      onSuccess("1");
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при обновлении поста");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        setFormData({ ...formData, imageUrl: uploadedUrl });
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => setIsEditModalOpen(false)}
      title="Редактировать пост"
    >
      <div className="space-y-6 h-full max-h-[80vh] overflow-y-auto">
        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Введите заголовок поста"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select
              value={formData.category}
              onValueChange={(value: PostCategory) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PostCategory.brand_history.toString()}>
                  История бренда
                </SelectItem>
                <SelectItem value={PostCategory.usage_and_care.toString()}>
                  Использование и уход
                </SelectItem>
                <SelectItem value={PostCategory.recipes.toString()}>
                  Вдохновляющие рецепты
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Главное изображение
            </Label>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-muted-foreground">
                    Загрузка изображения...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Перетащите изображение сюда или
                    </p>
                    <label className="text-sm text-white font-bold cursor-pointer hover:underline">
                      выберите файл
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileInput}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WEBP до 10MB
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {uploadError && (
              <p className="text-sm text-red-500">{uploadError}</p>
            )}

            {/* Image Preview */}
            {formData.imageUrl && (
              <div className="mt-3">
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Превью:
                </Label>
                <div className="relative inline-block">
                  <img
                    src={formData.imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-40 h-28 object-cover rounded-md border"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=112&width=160";
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                  >
                    ×
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Rich Text Editor for Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Содержание</Label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>

          <div className="flex justify-end items-end gap-3 pt-4">
            <Button
              type="button"
              variant="default"
              onClick={() => setIsEditModalOpen(false)}
            >
              Отмена
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPost;
