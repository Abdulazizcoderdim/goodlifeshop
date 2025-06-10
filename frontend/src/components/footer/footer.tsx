import { useState } from "react";
import { Headphones, CheckCircle, Lock, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && isChecked) {
      console.log("Subscribed with email:", email);
      setEmail("");
      setIsChecked(false);
    }
  };

  return (
    <div className="bg-gray border-t border-gray-300 pt-10 pb-6 text-gray-800">
      <footer className="custom-container">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Headphones className="h-6 w-6 text-gray-700" />
                <h3 className="font-bold uppercase text-lg">КОНТАКТЫ</h3>
              </div>
              <p className="text-sm">
                ЕСЛИ У ВАС ВОЗНИКЛИ ВОПРОСЫ, МЫ БУДЕМ РАДЫ ПОМОЧЬ.
              </p>
              <div>
                <Link to="#" className="text-sm font-medium hover:underline">
                  ОБРАТНАЯ СВЯЗЬ
                </Link>
              </div>
              <div className="space-y-1 text-sm">
                <p>+375296276521</p>
                <p>+375296276521</p>
                <p>ПН-ПТ: 10:00-18:00</p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-gray-700" />
                <h3 className="font-bold uppercase text-lg">
                  НАШИ ПРЕИМУЩЕСТВА
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>БЕСПЛАТНАЯ ДОСТАВКА ПО РЕСПУБЛИКЕ БЕЛАРУСЬ ОТ 200 РУБ</p>
                <p>БЕСПЛАТНАЯ ДОСТАВКА ПО г. МИНСКУ </p>
                <p>ГАРАНТИЯ КАЧЕСТВА</p>
              </div>
            </div>

            {/* Secure Payments Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-gray-700" />
                <h3 className="font-bold uppercase text-lg">
                  БЕЗОПАСНЫЕ ПЛАТЕЖИ
                </h3>
              </div>
              <div className="flex gap-2">
                <div className="bg-white rounded shadow-sm">
                  <img
                    src="/visa.png"
                    alt="Mastercard"
                    width={45}
                    height={30}
                    className="h-7"
                  />
                </div>
                <div className="bg-white rounded shadow-sm">
                  <img
                    src="/visa2.png"
                    alt="Visa"
                    width={45}
                    height={30}
                    className="h-7"
                  />
                </div>
                <div className="bg-white rounded shadow-sm">
                  <img
                    src="/mir.png"
                    alt="MIR"
                    width={45}
                    height={30}
                    className="h-7"
                  />
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-gray-700" />
                <h3 className="font-bold uppercase text-lg">
                  ПОДПИСАТЬСЯ НА НОВОСТИ
                </h3>
              </div>
              <p className="text-sm">
                Подпишитесь, узнавайте о наших акциях, мероприятиях и новинках.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите Email"
                    className="flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gray-800 text-white p-2 hover:bg-gray-700 transition-colors"
                    disabled={!email || !isChecked}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-xs">
                    Я согласен на{" "}
                    <Link to="#" className="underline">
                      обработку персональных данных
                    </Link>
                    , ознакомлен с{" "}
                    <Link to="#" className="underline">
                      политикой конфиденциальности
                    </Link>{" "}
                    и{" "}
                    <Link to="#" className="underline">
                      пользовательским соглашением
                    </Link>
                    .
                  </label>
                </div>
              </form>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {/* My Account Section */}
            <div className="space-y-4">
              <h3 className="font-bold uppercase text-lg">МОЙ ZWILLING</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/personal" className="hover:underline">
                    ЛИЧНЫЙ КАБИНЕТ
                  </Link>
                </li>
                <li>
                  <Link to="/personal/orders" className="hover:underline">
                    ТЕКУЩИЕ ЗАКАЗЫ
                  </Link>
                </li>
                <li>
                  <Link to="/personal/private" className="hover:underline">
                    ЛИЧНЫЕ ДАННЫЕ
                  </Link>
                </li>
                {/* <li>
                  <Link to="#" className="hover:underline">
                    АДРЕСА МАГАЗИНОВ
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Help Section */}
            <div className="space-y-4">
              <h3 className="font-bold uppercase text-lg">ПОМОЩЬ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/here_to_help/kontakty" className="hover:underline">
                    ВОЗВРАТ И ОБМЕН
                  </Link>
                </li>
                <li>
                  <Link to="/here_to_help/kontakty" className="hover:underline">
                    ДОСТАВКА
                  </Link>
                </li>
                <li>
                  <Link to="/here_to_help/kontakty" className="hover:underline">
                    ОБРАТНАЯ СВЯЗЬ
                  </Link>
                </li>
                <li>
                  <Link to="/here_to_help/kontakty" className="hover:underline">
                    КОНТАКТЫ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Interesting Section */}
            <div className="space-y-4">
              <h3 className="font-bold uppercase text-lg">ЭТО ИНТЕРЕСНО</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/culinary-world/o-kompanii"
                    className="hover:underline"
                  >
                    ИСТОРИЯ БРЕНДА
                  </Link>
                </li>
                <li>
                  <Link
                    to="/culinary-world/vdokhnovlyayushchie-retsepty"
                    className="hover:underline"
                  >
                    ВДОХНОВЛЯЮЩИЕ РЕЦЕПТЫ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/culinary-world/use-care"
                    className="hover:underline"
                  >
                    ИСПОЛЬЗОВАНИЕ И УХОД
                  </Link>
                </li>
              </ul>
            </div>

            {/* Brands Section */}
            <div className="space-y-4">
              <h3 className="font-bold uppercase text-lg">НАШИ БРЕНДЫ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/catalog/zwilling" className="hover:underline">
                    ZWILLING
                  </Link>
                </li>
                <li>
                  <Link to="/catalog/staub" className="hover:underline">
                    STAUB
                  </Link>
                </li>
                <li>
                  <Link to="/catalog/ballarini" className="hover:underline">
                    BALLARINI
                  </Link>
                </li>
              </ul>
              <div
                className="mt-6"
                onClick={() => window.open("https://www.vedita.ru", "_blank")}
              >
                <p className="text-sm cursor-pointer">РАЗРАБОТЧИК САЙТА</p>
                <img
                  src="/veda.svg?height=30&width=80"
                  alt="Developer Logo"
                  width={80}
                  height={30}
                  className="mt-2 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-10 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">© {new Date().getFullYear()} ZWILLING</div>
            <div className="flex max-sm:flex-col gap-6 text-sm">
              <Link to="#" className="hover:underline">
                ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ
              </Link>
              <Link to="#" className="hover:underline">
                ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
