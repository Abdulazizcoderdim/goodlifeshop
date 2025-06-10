import type { IProduct, IProductVariant } from "@/types";
import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Save, X, Loader2 } from "lucide-react";
import { useImageUploader } from "@/hooks/useImageUploader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import api from "@/http/axios";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  products?: IProduct[];
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  imageUrl?: string;
}

interface FormData {
  title: string;
  description: string;
  article: string;
  brand: string;
  series: string;
  originCountry: string;
  price: number;
  discountPercentage: number;
  color: string;
  dishwasherSafe: boolean;
  batteryRequired: boolean;
  dimensions: {
    productWeight: number;
    productHeight: number;
    productWidth: number;
    productLength: number;
    packageHeight: number;
    packageWidth: number;
    packageLength: number;
    productVolume: number;
  };
  images: string[];
  characteristics: { key: string; value: unknown }[];
  category: {
    id: string;
    name: string;
    subcategories: Subcategory[];
  };
  subcategoryId: string;
  variants: IProductVariant[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
  }[];
}

interface CategoriesResponse {
  success: boolean;
  content: Category[];
}

interface ProductResponse {
  success: boolean;
  content: IProduct;
}

const EditProductForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [uploadingImages, setUploadingImages] = useState<{
    [key: string]: boolean;
  }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [availableSubcategories, setAvailableSubcategories] = useState<
    Category["subcategories"]
  >([]);
  const { uploadImage } = useImageUploader();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<FormData>();

  const {
    fields: characteristicFields,
    append: appendCharacteristic,
    remove: removeCharacteristic,
  } = useFieldArray({
    control,
    name: "characteristics",
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  // Fetch product data and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const token = localStorage.getItem("accessToken");

        // Fetch product and categories in parallel
        const [productResponse, categoriesResponse] = await Promise.all([
          api.get<ProductResponse>(`/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get<CategoriesResponse>("/categories", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (productResponse.data.content) {
          const productData = productResponse.data.content;
          setProduct(productData);

          console.log(productData, "asasas");

          // Convert characteristics object to array for form handling
          const characteristicsArray = Object.entries(
            productData.characteristics || {}
          ).map(([key, value]) => ({
            key,
            value,
          }));

          const productCategory = categoriesResponse.data.content.find(
            (cat) => cat.id === productData.category.id
          );

          // Reset form with fetched data
          reset({
            title: productData.title,
            description: productData.description,
            article: productData.article,
            brand: productData.brand,
            series: productData.series,
            originCountry: productData.originCountry,
            price: productData.price,
            color: productData.color,
            discountPercentage: productData.discountPercentage,
            dishwasherSafe: productData.dishwasherSafe,
            batteryRequired: productData.batteryRequired,
            dimensions: productData.dimensions,
            images: productData.images,
            characteristics: characteristicsArray,
            category: {
              id: productData.category.id,
              name: productData.category.name,
              subcategories: productCategory?.subcategories || [],
            },
            subcategoryId: productData.subcategoryId || "",
            variants: productData.variants,
          });

          if (productCategory) {
            setAvailableSubcategories(productCategory.subcategories);
          }
        }

        if (categoriesResponse.data.content) {
          setCategories(categoriesResponse.data.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load product data. Please try again.");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId, reset]);

  const handleImageUpload = async (file: File, index: number) => {
    setUploadingImages((prev) => ({ ...prev, [index]: true }));

    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        const currentImages = getValues("images");
        const newImages = [...currentImages];
        newImages[index] = imageUrl;
        setValue("images", newImages);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.log(error);
    } finally {
      setUploadingImages((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleVariantImageUpload = async (
    file: File,
    variantIndex: number,
    imageIndex: number
  ) => {
    const uploadKey = `variant-${variantIndex}-${imageIndex}`;
    setUploadingImages((prev) => ({ ...prev, [uploadKey]: true }));

    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        const currentVariants = getValues("variants");
        const newVariants = [...currentVariants];
        if (!newVariants[variantIndex].images) {
          newVariants[variantIndex].images = [];
        }
        newVariants[variantIndex].images[imageIndex] = imageUrl;
        setValue("variants", newVariants);
        toast.success("Variant image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload variant image");
      console.log(error);
    } finally {
      setUploadingImages((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const addImage = () => {
    const currentImages = getValues("images");
    setValue("images", [...currentImages, ""]);
  };

  const removeImage = (index: number) => {
    const currentImages = getValues("images");
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages);
  };

  const addVariantImage = (variantIndex: number) => {
    const currentVariants = getValues("variants");
    const newVariants = [...currentVariants];
    if (!newVariants[variantIndex].images) {
      newVariants[variantIndex].images = [];
    }
    newVariants[variantIndex].images.push("");
    setValue("variants", newVariants);
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const currentVariants = getValues("variants");
    const newVariants = [...currentVariants];
    newVariants[variantIndex].images = newVariants[variantIndex].images.filter(
      (_, i) => i !== imageIndex
    );
    setValue("variants", newVariants);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Convert form data back to API format
      const characteristics: Record<string, unknown> = {};
      data.characteristics.forEach(({ key, value }) => {
        if (key.trim()) {
          characteristics[key] = value;
        }
      });

      const updateData = {
        title: data.title,
        description: data.description,
        article: data.article,
        brand: data.brand,
        series: data.series,
        originCountry: data.originCountry,
        price: Number(data.price),
        discountPercentage: Number(data.discountPercentage),
        color: data.color,
        dishwasherSafe: data.dishwasherSafe,
        batteryRequired: data.batteryRequired,
        dimensions: {
          productWeight: Number(data.dimensions.productWeight),
          productHeight: Number(data.dimensions.productHeight),
          productWidth: Number(data.dimensions.productWidth),
          productLength: Number(data.dimensions.productLength),
          packageHeight: Number(data.dimensions.packageHeight),
          packageWidth: Number(data.dimensions.packageWidth),
          packageLength: Number(data.dimensions.packageLength),
          productVolume: Number(data.dimensions.productVolume),
        },
        images: data.images.filter((url) => url.trim()),
        characteristics,
        categoryId: data.category.id,
        subcategoryId: data.subcategoryId,
        variants: data.variants.map((variant) => ({
          ...variant,
          price: Number(variant.price),
          images: variant.images.filter((url) => url.trim()),
        })),
      };

      const token = localStorage.getItem("accessToken");

      const response = await api.put(`/products/${productId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.content) {
        toast.success("Product updated successfully");
        // Navigate back or to product list
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "category.id" && value.category?.id) {
        const selectedCategory = categories.find(
          (cat) => cat.id === value?.category?.id
        );
        if (selectedCategory) {
          setAvailableSubcategories(selectedCategory.subcategories || []);
          setValue("subcategoryId", "");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, categories, setValue]);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (isLoadingData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading product data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">Product not found</p>
          <Button onClick={handleGoBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const watchedImages = watch("images");
  const watchedVariants = watch("variants");

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between bg-gray-800 px-5 py-3 border-b border-b-gray-700">
        <h2 className="text-2xl font-bold">Редактировать товар</h2>
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="bg-gray-800 hover:bg-gray-700 border-gray-700"
        >
          <X className="w-4 h-4 mr-2" />
          Закрыть
        </Button>
      </div>
      <div className="p-5 overflow-auto w-full bg-gray-900 text-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800 border-gray-700">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-gray-700 text-gray-100"
              >
                Основная информация
              </TabsTrigger>
              <TabsTrigger
                value="dimensions"
                className="data-[state=active]:bg-gray-700 text-gray-100"
              >
                Размеры
              </TabsTrigger>
              <TabsTrigger
                value="characteristics"
                className="data-[state=active]:bg-gray-700 text-gray-100"
              >
                Характеристики
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-gray-700 text-gray-100"
              >
                Изображения
              </TabsTrigger>
              <TabsTrigger
                value="variants"
                className="data-[state=active]:bg-gray-700 text-gray-100"
              >
                Варианты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 w-full">
              <Card className="bg-gray-800 border-gray-700 text-gray-100">
                <CardHeader>
                  <CardTitle>Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Название *</Label>
                      <Input
                        id="title"
                        {...register("title", {
                          required: "Название обязательно",
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="article">Артикул</Label>
                      <Input
                        id="article"
                        {...register("article")}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      className="mt-1 bg-gray-700 border-gray-600 text-white"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Бренд</Label>
                      <Input
                        id="brand"
                        {...register("brand")}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="series">Серия</Label>
                      <Input
                        id="series"
                        {...register("series")}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="originCountry">
                        Страна происхождения
                      </Label>
                      <Input
                        id="originCountry"
                        {...register("originCountry")}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Цена *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price", {
                          required: "Цена обязательна",
                          min: {
                            value: 0,
                            message: "Цена должна быть положительной",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                      {errors.price && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="discountPercentage">Процент скидки</Label>
                      <Input
                        id="discountPercentage"
                        type="number"
                        step="0.01"
                        {...register("discountPercentage", {
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                      {errors.discountPercentage && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.discountPercentage.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="color">Цвет</Label>
                      <Input
                        id="color"
                        {...register("color")}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Kategoriya *</Label>
                    <Select
                      value={watch("category.id")}
                      onValueChange={(value) => {
                        const selectedCategory = categories.find(
                          (cat) => cat.id === value
                        );
                        if (selectedCategory) {
                          setValue("category", {
                            id: selectedCategory.id,
                            name: selectedCategory.name,
                            subcategories: selectedCategory.subcategories.map(
                              (subcategory) => ({
                                id: subcategory.id,
                                name: subcategory.name,
                                slug: subcategory.slug,
                                categoryId: subcategory.categoryId,
                              })
                            ),
                          });
                          setAvailableSubcategories(
                            selectedCategory.subcategories || []
                          );
                          setValue("subcategoryId", "");
                        }
                      }}
                    >
                      <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Kategoriyani tanlang" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="hover:bg-gray-700"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category?.id && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.category.id.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subcategoryId">Subkategoriya *</Label>
                    <Select
                      value={watch("subcategoryId")}
                      onValueChange={(value) =>
                        setValue("subcategoryId", value)
                      }
                      disabled={
                        !watch("category.id") ||
                        availableSubcategories.length === 0
                      }
                    >
                      <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                        <SelectValue
                          placeholder={
                            !watch("category.id")
                              ? "Avval kategoriyani tanlang"
                              : availableSubcategories.length === 0
                              ? "Subkategoriya mavjud emas"
                              : "Subkategoriyani tanlang"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {availableSubcategories.map((subcategory) => (
                          <SelectItem
                            key={subcategory.id}
                            value={subcategory.id}
                            className="hover:bg-gray-700"
                          >
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subcategoryId && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.subcategoryId.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dishwasherSafe"
                        {...register("dishwasherSafe")}
                        className="border-gray-600 data-[state=checked]:bg-gray-700"
                      />
                      <Label htmlFor="dishwasherSafe">
                        Можно мыть в посудомойке
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="batteryRequired"
                        {...register("batteryRequired")}
                        className="border-gray-600 data-[state=checked]:bg-gray-700"
                      />
                      <Label htmlFor="batteryRequired">
                        Требуются батарейки
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dimensions" className="space-y-4 w-full">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="text-gray-100">
                  <CardTitle>Размеры товара</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productWeight">Вес (кг)</Label>
                      <Input
                        id="productWeight"
                        type="number"
                        step="0.1"
                        {...register("dimensions.productWeight", {
                          min: {
                            value: 0,
                            message: "Вес должен быть положительным",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="productVolume">Объем (л)</Label>
                      <Input
                        id="productVolume"
                        type="number"
                        step="0.1"
                        {...register("dimensions.productVolume", {
                          min: {
                            value: 0,
                            message: "Объем должен быть положительным",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="productHeight">Высота (см)</Label>
                      <Input
                        id="productHeight"
                        type="number"
                        step="0.1"
                        {...register("dimensions.productHeight", {
                          min: {
                            value: 0,
                            message: "Высота должна быть положительной",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="productWidth">Ширина (см)</Label>
                      <Input
                        id="productWidth"
                        type="number"
                        step="0.1"
                        {...register("dimensions.productWidth", {
                          min: {
                            value: 0,
                            message: "Ширина должна быть положительной",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="productLength">Длина (см)</Label>
                      <Input
                        id="productLength"
                        type="number"
                        step="0.1"
                        {...register("dimensions.productLength", {
                          min: {
                            value: 0,
                            message: "Длина должна быть положительной",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full bg-gray-800 border-gray-700">
                <CardHeader className="text-gray-100">
                  <CardTitle>Размеры упаковки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="packageHeight">Высота (см)</Label>
                      <Input
                        id="packageHeight"
                        type="number"
                        step="0.1"
                        {...register("dimensions.packageHeight", {
                          min: {
                            value: 0,
                            message: "Высота должна быть положительной",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="packageWidth">Ширина (см)</Label>
                      <Input
                        id="packageWidth"
                        type="number"
                        step="0.1"
                        {...register("dimensions.packageWidth", {
                          min: {
                            value: 0,
                            message: "Ширина должна быть положительной",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="packageLength">Длина (см)</Label>
                      <Input
                        id="packageLength"
                        type="number"
                        step="0.1"
                        {...register("dimensions.packageLength", {
                          min: {
                            value: 0,
                            message: "Длина должна быть положительной",
                          },
                          valueAsNumber: true,
                        })}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="characteristics" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="text-gray-100">
                  <CardTitle className="flex items-center justify-between">
                    Характеристики товара
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendCharacteristic({ key: "", value: "" })
                      }
                      className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить характеристику
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-100">
                  {characteristicFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Label htmlFor={`characteristics.${index}.key`}>
                          Название
                        </Label>
                        <Input
                          {...register(`characteristics.${index}.key`)}
                          placeholder="например, Материал"
                          className="mt-1 bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`characteristics.${index}.value`}>
                          Значение
                        </Label>
                        <Input
                          {...register(`characteristics.${index}.value`)}
                          placeholder="например, Нержавеющая сталь"
                          className="mt-1 bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCharacteristic(index)}
                        className="text-red-400 hover:text-red-300 border-gray-600 hover:bg-gray-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {characteristicFields.length === 0 && (
                    <p className="text-gray-400 text-center py-4">
                      Нет добавленных характеристик. Нажмите "Добавить
                      характеристику".
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="text-gray-100">
                  <CardTitle className="flex items-center justify-between">
                    Изображения товара
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addImage}
                      className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить изображение
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-100">
                  {watchedImages?.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center p-4 border rounded-lg border-gray-700"
                    >
                      <div className="flex-1">
                        <Label htmlFor={`image-${index}`}>
                          Изображение {index + 1}
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, index);
                              }
                            }}
                            className="flex-1 bg-gray-700 border-gray-600 text-white"
                            disabled={uploadingImages[index]}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="text-red-400 hover:text-red-300 border-gray-600 hover:bg-gray-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {uploadingImages[index] && (
                          <p className="text-sm text-blue-400 mt-1">
                            Загрузка...
                          </p>
                        )}
                      </div>
                      {imageUrl && (
                        <div className="w-20 h-20 border rounded-lg overflow-hidden border-gray-700">
                          <img
                            loading="lazy"
                            src={imageUrl || "/placeholder.svg"}
                            alt={`Товар ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {(!watchedImages || watchedImages.length === 0) && (
                    <p className="text-gray-400 text-center py-4">
                      Нет добавленных изображений. Нажмите "Добавить
                      изображение".
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="text-gray-100">
                  <CardTitle className="flex items-center justify-between">
                    Варианты товара
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendVariant({
                          color: "",
                          price: 0,
                          inStock: true,
                          images: [],
                        })
                      }
                      className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить вариант
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-100">
                  {variantFields.map((field, variantIndex) => (
                    <div
                      key={field.id}
                      className="p-4 border rounded-lg space-y-4 border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Вариант {variantIndex + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeVariant(variantIndex)}
                          className="text-red-400 hover:text-red-300 border-gray-600 hover:bg-gray-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor={`variants.${variantIndex}.color`}>
                            Цвет
                          </Label>
                          <Input
                            {...register(`variants.${variantIndex}.color`)}
                            placeholder="например, Красный"
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`variants.${variantIndex}.price`}>
                            Цена
                          </Label>
                          <Input
                            type="number"
                            step="0.01"
                            {...register(`variants.${variantIndex}.price`, {
                              min: {
                                value: 0,
                                message: "Цена должна быть положительной",
                              },
                              valueAsNumber: true,
                            })}
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>

                        <div className="flex items-center space-x-2 mt-6">
                          <Checkbox
                            {...register(`variants.${variantIndex}.inStock`)}
                            className="border-gray-600 data-[state=checked]:bg-gray-700"
                          />
                          <Label>В наличии</Label>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Изображения варианта</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addVariantImage(variantIndex)}
                            className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить изображение
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {watchedVariants?.[variantIndex]?.images?.map(
                            (imageUrl, imageIndex) => (
                              <div
                                key={imageIndex}
                                className="flex gap-2 items-center"
                              >
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleVariantImageUpload(
                                        file,
                                        variantIndex,
                                        imageIndex
                                      );
                                    }
                                  }}
                                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                                  disabled={
                                    uploadingImages[
                                      `variant-${variantIndex}-${imageIndex}`
                                    ]
                                  }
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    removeVariantImage(variantIndex, imageIndex)
                                  }
                                  className="text-red-400 hover:text-red-300 border-gray-600 hover:bg-gray-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                                {imageUrl && (
                                  <div className="w-12 h-12 border rounded overflow-hidden border-gray-700">
                                    <img
                                      src={imageUrl || "/placeholder.svg"}
                                      alt={`Вариант ${
                                        variantIndex + 1
                                      } Изображение ${imageIndex + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {variantFields.length === 0 && (
                    <p className="text-gray-400 text-center py-4">
                      Нет добавленных вариантов. Нажмите "Добавить вариант".
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoBack}
              disabled={isLoading}
              className="bg-gray-800 hover:bg-gray-700 border-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
