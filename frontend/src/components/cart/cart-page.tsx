import { useEffect, useState } from "react";
import { X, Heart, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, isFavorite } = useStore();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  console.log("cartItems", cartItems);

  const handleQuantityChange = (productId: number, quantity: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.quantity + quantity;
        if (newQuantity < 1) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    updateQuantity(
      productId,
      updatedCart.find((item) => item.id === productId)?.quantity || 0
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    removeFromCart(id);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * Number(item.quantity),
      0
    );
  };

  return (
    <div className="bg-gray">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6">
              <ShoppingCart className="w-24 h-24 text-gray-400" />
            </div>
            <h2 className="text-2xl text-gray-400 font-light mb-6">
              Ваша корзина пуста
            </h2>
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Нажмите здесь, чтобы продолжить покупки
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-2xl font-bold tracking-wider uppercase mb-2">
                ВАША КОРЗИНА
              </h1>
              <div className="w-20 h-0.5 bg-black font-bold mx-auto"></div>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm mb-8">
              {/* Header - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-12 py-4 px-6 text-sm border-b text-gray-500">
                <div className="col-span-6">ТОВАР</div>
                <div className="col-span-2 text-center">ЦЕНА</div>
                <div className="col-span-2 text-center">КОЛ-ВО</div>
                <div className="col-span-2 text-center">СТОИМОСТЬ</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-12 py-6 px-4 mb-5 sm:px-6 items-center border-b"
                >
                  {/* Product info - Full width on mobile */}
                  <div className="col-span-1 sm:col-span-6 flex gap-4 sm:gap-6 mb-4 sm:mb-0">
                    <div
                      onClick={() => navigate("/catalog")}
                      className="w-16 h-24 relative flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-grow">
                      <div>
                        <h3
                          onClick={() => navigate("/catalog/")}
                          className="text-base font-normal hover:underline cursor-pointer"
                        >
                          {item.name.substring(1)}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">В наличии</p>
                      </div>
                      {/* Favorite Icon */}
                      {isFavorite(item.id) && (
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

                  {/* Mobile layout for price, quantity and total */}
                  <div className="sm:hidden grid grid-cols-3 gap-2 w-full mb-2">
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500 mb-1">ЦЕНА</span>
                      <span className="font-medium">
                        {item.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">КОЛ-ВО</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-7 h-7 cursor-pointer flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-7 h-7 cursor-pointer flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 mb-1">
                        СТОИМОСТЬ
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-medium mr-2">
                          {(item.price * Number(item.quantity)).toLocaleString(
                            "ru-RU"
                          )}{" "}
                          ₽
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout - hidden on mobile */}
                  <div className="hidden sm:block col-span-2 text-center font-medium">
                    {item.price.toLocaleString("ru-RU")} ₽
                  </div>
                  <div className="hidden sm:flex col-span-2 items-center justify-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-8 h-8 cursor-pointer flex items-center justify-center text-xl font-light"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-8 h-8 cursor-pointer flex items-center justify-center text-xl font-light"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="hidden sm:flex col-span-2 items-center justify-between">
                    <span className="font-medium">
                      {(item.price * Number(item.quantity)).toLocaleString(
                        "ru-RU"
                      )}{" "}
                      ₽
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Coupon and Summary */}
              <div className="flex px-6 flex-col md:flex-row justify-between gap-6 md:gap-8 mb-8">
                <div className="w-full md:w-1/2">
                  <p className="text-sm text-gray-600 mb-2">
                    Введите код купона для скидки:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      className="border border-gray-300 rounded-none h-10 sm:h-12 focus:ring-0 focus:border-gray-400"
                      placeholder=""
                    />
                    <Button
                      variant="outline"
                      className="h-10 sm:h-12 px-3 sm:px-6 border border-gray-300 rounded-none text-gray-500 hover:bg-gray-50 text-xs sm:text-sm"
                    >
                      ПРИМЕНИТЬ
                    </Button>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/"
                      className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Вернуться к покупкам
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-start md:items-end mt-6 md:mt-0">
                  <div className="flex justify-between w-full mb-2">
                    <span className="text-sm text-gray-600">
                      Стоимость товаров:
                    </span>
                    <span className="font-medium">
                      {calculateTotal().toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <div className="flex justify-between w-full mb-6">
                    <span className="text-lg font-medium">Итого:</span>
                    <span className="text-lg font-medium">
                      {calculateTotal().toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
              <button className="text-sm underline cursor-pointer text-gray-500 hover:text-gray-700 mt-4 sm:mt-0">
                Очистить корзину
              </button>
              <Button className="w-full sm:w-auto px-8 sm:px-16 py-5 sm:py-6 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-none font-normal text-base">
                ОФОРМИТЬ ЗАКАЗ
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
