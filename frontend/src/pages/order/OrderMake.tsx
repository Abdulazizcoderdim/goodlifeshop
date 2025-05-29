import { Button } from "@/components/ui/button";
import api from "@/http/axios";
import { useStore } from "@/store/useStore";
import type { IProduct } from "@/types";
import { Skeleton } from "antd";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface CartItemWithProduct {
  productId: string;
  quantity: number;
  product: IProduct | null;
  loading: boolean;
}

const OrderMake = () => {
  const { cart, isFavorite } = useStore();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductById = async (id: string): Promise<IProduct | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.content;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      const itemsWithProducts = await Promise.all(
        cart.map(async (item) => ({
          productId: item.productId, // Changed to match store structure
          quantity: item.quantity,
          product: await fetchProductById(item.productId),
          loading: false,
        }))
      );
      setCartItems(itemsWithProducts);
      setLoading(false);
    };

    if (cart.length > 0) {
      loadCartItems();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-gray">
      <div className="custom-container pb-5">
        <h1 className="text-center py-5 w-full text-2xl font-bold uppercase">
          оформить заказ
        </h1>
        <div className="flex gap-5">
          <div className="w-full bg-white p-3">
            {loading ? (
              <Skeleton className="h-4 w-1/2" />
            ) : (
              cartItems.map((item) => {
                const product = item.product;

                if (!product) {
                  return (
                    <div
                      key={item.productId}
                      className="grid grid-cols-1 sm:grid-cols-12 py-6 px-4 mb-5 sm:px-6 items-center border-b"
                    >
                      <div className="col-span-12 text-center text-gray-500">
                        Продукт не найден
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.productId}
                    className="grid grid-cols-1 sm:grid-cols-12 py-6 px-4 mb-5 sm:px-6 items-center border-b"
                  >
                    <div className="col-span-1 sm:col-span-6 flex gap-4 sm:gap-6 mb-4 sm:mb-0">
                      <div className="w-16 h-24 relative flex-shrink-0">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-grow">
                        <div>
                          <h3 className="text-base font-normal ">
                            {product.title?.substring(0, 50)}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            В наличии
                          </p>
                        </div>
                        {isFavorite(product.id) && (
                          <div className="flex items-center mt-2">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-2">
                              <Heart className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs text-gray-600">
                              Товар отложен. Добавить к заказу?
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="sm:hidden grid grid-cols-3 gap-2 w-full mb-2">
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500 mb-1">ЦЕНА</span>
                        <span className="font-medium">
                          {product.price.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 mb-1">
                          КОЛ-ВО
                        </span>
                        <div className="flex items-center">
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 mb-1">
                          СТОИМОСТЬ
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="font-medium mr-2">
                            {(product.price * item.quantity).toLocaleString(
                              "ru-RU"
                            )}{" "}
                            ₽
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:block col-span-2 text-center font-medium">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="hidden sm:flex col-span-2 items-center justify-center">
                      <div className="flex items-center">
                        <span className="w-8 text-center">{item.quantity}</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex col-span-2 items-center justify-between">
                      <span className="font-medium">
                        {(product.price * item.quantity).toLocaleString(
                          "ru-RU"
                        )}{" "}
                        ₽
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="w-1/3 sticky top-16 min-h-52 bg-white">
            <div className="border-t border-t-red-500 sm:p-4 p-2">
              <div className="flex text-lg font-bold border-b py-3 items-center justify-between">
                <h1>Общая стоимость</h1>
                <p>35 500.00</p>
              </div>

              <div className="flex mt-5 items-center justify-between">
                <p>НДС (20%, включен в цену):</p>
                <p>5 916.67</p>
              </div>
              <div className="flex mt-5 items-center justify-between">
                <p>Доставка:</p>
                <p className="text-green-500">бесплатно</p>
              </div>
              <div className="flex mt-5 items-center justify-between">
                <p>Итого:</p>
                <p>35 500.00</p>
              </div>

              <Button
                variant={"destructive"}
                className="mt-5 w-full rounded-none py-6"
              >
                Оформить заказ
              </Button>

              <p className="text-gray-400 text-sm mt-5">
                Нажимая кнопку «Оформить заказ», вы даете согласие на обработку
                персональных данных, так же ознакомлены с политикой
                конфиденциальности и пользовательским соглашением.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMake;
