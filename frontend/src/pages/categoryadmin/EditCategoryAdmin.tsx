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
import type { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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

interface EditCategoryAdminProps {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: Category;
  onSuccess: (updatedCategory: Category) => void;
}

const EditCategoryAdmin = ({
  setIsEditModalOpen,
  defaultValues,
  onSuccess,
}: EditCategoryAdminProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImage, uploading } = useImageUploader();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues.name || "",
      imageUrl: defaultValues.imageUrl || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: defaultValues.name || "",
      imageUrl: defaultValues.imageUrl || "",
    });
  }, [defaultValues, form]);

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);

    try {
      const response = await api.put(`/categories/${defaultValues.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.data) {
        throw new Error("Failed to update category");
      }

      if (response.data) {
        toast.success("Категория успешно обновлена");

        onSuccess(response.data.content);

        setIsEditModalOpen(false);
      } else {
        throw new Error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);

      toast("Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    setIsEditModalOpen(false);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      form.setValue("imageUrl", url);
      toast.success("Изображение успешно загружено");
    } else {
      toast.error("Failed to upload image");
    }
  };

  return (
    <Modal isOpen={true} onClose={handleClose} title="Edit Category">
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
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Input
                      onChange={handleUploadImage}
                      type="file"
                      accept="image/*"
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
                type="submit"
                variant={"secondary"}
                disabled={isLoading || uploading}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Category"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Category info */}
        <div className="mt-4 p-3 bg-blue-950/20 rounded-md border border-gray-700">
          <h4 className="text-sm font-medium text-white  mb-2">
            Category Information:
          </h4>
          <div className="space-y-1 text-sm text-white dark:text-blue-200">
            <p>
              <span className="font-medium">Image:</span> {defaultValues.name}
            </p>
            {defaultValues.imageUrl && (
              <div className="">
                <img
                  src={form.getValues("imageUrl") || defaultValues.imageUrl}
                  width={150}
                  alt=""
                />
              </div>
            )}
            {/* <p>
              <span className="font-medium">ID:</span> {defaultValues.id}
            </p>
            {defaultValues.createdAt && (
              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(defaultValues.createdAt).toLocaleDateString()}
              </p>
            )} */}
            {defaultValues.updatedAt && (
              <p>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(defaultValues.updatedAt).toLocaleDateString()}
              </p>
            )}
            {defaultValues._count?.products !== undefined && (
              <p>
                <span className="font-medium">Products:</span>{" "}
                {defaultValues._count.products}
              </p>
            )}
            {defaultValues._count?.subcategories !== undefined && (
              <p>
                <span className="font-medium">Subcategories:</span>{" "}
                {defaultValues._count.subcategories}
              </p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategoryAdmin;
