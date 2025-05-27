import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/admin-panel/modal/Modal";
import type { Subcategory } from "@/types";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/http/axios";

interface EditSubcategoryProps {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: Subcategory;
  onSuccess: (page: string) => void;
}

interface Category {
  id: string;
  name: string;
}

interface SubcategoryFormData {
  name: string;
  categoryId: string;
}

const EditSubcategory = ({
  setIsEditModalOpen,
  defaultValues,
  onSuccess,
}: EditSubcategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubcategoryFormData>({
    defaultValues: {
      name: defaultValues.name || "",
      categoryId: defaultValues.categoryId || "",
    },
  });

  const selectedCategoryId = watch("categoryId");

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsFetchingCategories(true);
    try {
      const response = await api.get("/categories");

      setCategories(response.data.content || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast("Failed to fetch categories. Please try again");
    } finally {
      setIsFetchingCategories(false);
    }
  };

  const onSubmit = async (data: SubcategoryFormData) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Authentication token not found. Please login again");
        return;
      }

      await api.put(
        `/subcategories/${defaultValues.id}`,
        {
          name: data.name.trim(),
          categoryId: data.categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Subcategory updated successfully");

      onSuccess("1");

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating subcategory:", error);

      toast("Failed to update subcategory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Modal isOpen={true} onClose={handleClose} title="Edit Subcategory">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Selection */}
        <div className="space-y-2">
          <Label htmlFor="categoryId">Parent Category *</Label>
          {isFetchingCategories ? (
            <div className="flex items-center justify-center p-3 border rounded-md">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-gray-500">
                Loading categories...
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
                    No categories available
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
          <Label htmlFor="name">Subcategory Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter subcategory name"
            {...register("name", {
              required: "Subcategory name is required",
              minLength: {
                value: 2,
                message: "Subcategory name must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Subcategory name must not exceed 100 characters",
              },
            })}
            className={errors.name ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Current Values Info */}
        <div className="bg-gray-700 p-3 rounded-md border border-gray-700">
          <h4 className="text-sm font-medium text-white mb-2">
            Current Information
          </h4>
          <div className="text-sm text-white space-y-1">
            <p>
              <span className="font-medium">ID:</span> {defaultValues.id}
            </p>
            <p>
              <span className="font-medium">Current Name:</span>{" "}
              {defaultValues.name}
            </p>
            {defaultValues.createdAt && (
              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(defaultValues.createdAt).toLocaleDateString()}
              </p>
            )}
            {defaultValues.updatedAt && (
              <p>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(defaultValues.updatedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
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
            disabled={
              isLoading || isFetchingCategories || categories.length === 0
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Subcategory"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSubcategory;
