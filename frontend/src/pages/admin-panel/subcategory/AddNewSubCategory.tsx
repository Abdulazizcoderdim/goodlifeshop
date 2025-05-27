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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/http/axios";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  onCategoryAdded: (page: string) => void;
  isOpen: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface SubCategoryFormData {
  name: string;
  categoryId: string;
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubCategoryFormData>({
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  const selectedCategoryId = watch("categoryId");

  // Fetch categories when modal opens
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
      toast("Failed to fetch categories. Please try again");
    } finally {
      setIsFetchingCategories(false);
    }
  };

  const onSubmit = async (data: SubCategoryFormData) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast("Authentication token not found. Please login again");
        return;
      }

      await api.post(
        "/subcategories",
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

      toast.success("Subcategory added successfully");

      reset();

      onCategoryAdded("1");

      handleClose();
    } catch (error) {
      console.error("Error adding subcategory:", error);

      toast.error("Failed to add subcategory. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsModalOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Subcategory">
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
              pattern: {
                value: /^[a-zA-Z0-9\s\-_]+$/,
                message:
                  "Subcategory name can only contain letters, numbers, spaces, hyphens, and underscores",
              },
            })}
            className={errors.name ? "border-red-500" : "text-white"}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
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
            type="submit"
            variant={"secondary"}
            disabled={
              isLoading || isFetchingCategories || categories.length === 0
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Adding...
              </>
            ) : (
              "Add Subcategory"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewSubCategory;
