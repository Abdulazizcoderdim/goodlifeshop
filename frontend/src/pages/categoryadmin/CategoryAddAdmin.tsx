import Modal from "@/components/admin-panel/modal/Modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useImageUploader } from "@/hooks/useImageUploader";
import api from "@/http/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Form validation schema
const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters")
    .trim(),
  imageUrl: z.string().url({ message: "Неверный URL изображения" }),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  isOpen: boolean;
  onCategoryAdded: (page: string) => void;
}

const CategoryAddAdmin = ({
  setIsModalOpen,
  onClose,
  isOpen,
  onCategoryAdded,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { uploadImage, uploading } = useImageUploader();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const currentImageUrl = form.watch("imageUrl");

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/categories", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.data) {
        throw new Error("Failed to create category");
      }

      if (response.data) {
        toast.success("Category created successfully");

        form.reset();
        setIsModalOpen(false);
        onCategoryAdded("1");
      } else {
        throw new Error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);

      toast.error("Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    const url = await uploadImage(file);
    if (url) {
      form.setValue("imageUrl", url);
      toast.success("Изображение успешно загружено");
    } else {
      toast.error("Failed to upload image");
    }
  };

  const handleRemoveImage = () => {
    form.setValue("imageUrl", "");
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Category">
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      {...field}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Preview */}
            {(imagePreview || currentImageUrl) && (
              <div className="relative">
                <img
                  loading="lazy"
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
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant={"secondary"}
                type="submit"
                disabled={isLoading || uploading}
                className="min-w-[100px] text-black"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryAddAdmin;
