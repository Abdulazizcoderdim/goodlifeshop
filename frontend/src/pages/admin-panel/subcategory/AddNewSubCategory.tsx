import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import api from "@/http/axios";
import { useImageUploader } from "@/hooks/useImageUploader";
import type { Category, Subcategory } from "@/types";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  onCategoryAdded: (page: string) => void;
  isOpen: boolean;
}

const AddNewSubCategory = ({
  setIsModalOpen,
  onClose,
  onCategoryAdded,
  isOpen,
}: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Subcategory>({
    defaultValues: {
      name: "",
      categoryId: "",
      imageUrl: "",
      description: "",
    },
  });

  const { uploadImage, uploading } = useImageUploader();
  const selectedCategoryId = watch("categoryId");
  const currentImageUrl = watch("imageUrl");

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    setIsFetchingCategories(true);
    try {
      const response = await api.get("/categories");
      setCategories(response.data.content || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories. Please try again");
    } finally {
      setIsFetchingCategories(false);
    }
  };

  const onSubmit = async (data: Subcategory) => {
    setIsLoading(true);

    console.log(data);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Authentication token not found. Please login again");
        return;
      }

      await api.post(
        "/subcategories",
        {
          name: data.name.trim(),
          categoryId: data.categoryId,
          imageUrl: data.imageUrl,
          description: data.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Subcategory added successfully");
      resetForm();
      onCategoryAdded("1");
      handleClose();
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.error("Failed to add subcategory. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setImagePreview(null);
  };

  const handleClose = () => {
    resetForm();
    setIsModalOpen(false);
    onClose();
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const url = await uploadImage(file);
      if (url) {
        setValue("imageUrl", url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleRemoveImage = () => {
    setValue("imageUrl", "");
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Добавить новую подкатегорию"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Selection */}
        <div className="space-y-2">
          <Label htmlFor="categoryId">Родительская категория *</Label>
          {isFetchingCategories ? (
            <div className="flex items-center justify-center p-3 border rounded-md">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-gray-500">
                Загрузка категорий...
              </span>
            </div>
          ) : (
            <Select
              value={selectedCategoryId}
              onValueChange={(value: string) => setValue("categoryId", value)}
            >
              <SelectTrigger
                className={errors.categoryId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500">
                    Нет доступных категорий
                  </div>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
          <input
            type="hidden"
            {...register("categoryId", {
              required: "Please select a parent category",
            })}
          />
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Subcategory Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Название подкатегории *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter subcategory name"
            {...register("name", {
              required: "Требуется название подкатегории",
              minLength: {
                value: 2,
                message:
                  "Название подкатегории должно содержать не менее 2 символов.",
              },
              maxLength: {
                value: 100,
                message:
                  "Название подкатегории не должно превышать 100 символов.",
              },
            })}
            className={errors.name ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Subcategory Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Subcategory Description *</Label>
          <Textarea
            id="description"
            placeholder="Введите описание подкатегории"
            {...register("description")}
            className={errors.description ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Subcategory Image */}
        <div className="space-y-2">
          <Label htmlFor="image">Подкатегория Изображение *</Label>

          {/* Image Preview */}
          {(imagePreview || currentImageUrl) && (
            <div className="relative">
              <img
                src={imagePreview || currentImageUrl || ""}
                alt="Preview"
                className="h-40 w-full object-contain rounded-md border"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          )}

          {/* File Input */}
          <div className="flex items-center gap-2">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              disabled={isLoading || uploading}
              className="cursor-pointer"
            />
            {uploading && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            )}
          </div>

          {errors.imageUrl && (
            <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              isLoading ||
              isFetchingCategories ||
              categories.length === 0 ||
              uploading ||
              !currentImageUrl
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Добавление...
              </>
            ) : (
              "Добавить подкатегорию"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewSubCategory;
