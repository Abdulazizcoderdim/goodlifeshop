import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BrandStaub = () => {
  return (
    <div className="custom-container">
      <div className="w-full">
        <video
          playsInline={true}
          autoPlay={true}
          loop={true}
          className="w-full"
        >
          <source
            src="https://zwilling.ru/upload/iblock/d1a/6k5rq680tiif8lilwjf02zqfvkaxniu4.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="flex justify-center text-center flex-col mt-10">
        <div className="flex justify-center">
          <img src="/s1.webp" className="h-16" alt="" />
        </div>
        <h1 className="mt-10 md:text-3xl text-lg font-bold">
          Каталог товаров STAUB
        </h1>
        <div className="flex items-center gap-5 w-full justify-center sm:mt-10 mt-5">
          <div className="flex flex-col gap-3">
            <img
              src="https://zwilling.ru/upload/resize_cache/uf/8c1/450_300_1/o40hn7m9q7td24a36a0s8g24h86iovuc.webp"
              alt=""
              className="w-60"
            />
            <Button asChild variant={"default"}>
              <Link to={"/catalog/posuda"}>STAUB Посуда</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <img
              src="https://zwilling.ru/upload/uf/226/rfjipnpdnesba62zcguj7k57tge4povz.webp"
              alt=""
              className="w-60"
            />
            <Button asChild variant={"default"}>
              <Link to={"/catalog/aksessuary"}>STAUB Аксессуары</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex max-md:flex-col justify-between md:mt-20 mt-10">
        <div className="md:w-1/2">
          <img
            src="https://zwilling.ru/upload/brands/staub/articles/STAUB_50_Years_2024_website_brand_page_content_block_1365x1365-768.webp"
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 text-center space-y-4 p-4 flex-col justify-center bg-[#006072] text-white">
          <h1 className="md:text-3xl text-lg font-normal">
            Подайте STAUB к Вашему столу
          </h1>
          <p>
            На протяжении последних 50 лет, мы несем вам наше наследие,
            вдохновение, удовольствие и страсть… и лучшее еще впереди. От
            чугунной посуды, рассчитанной на всю жизнь, до керамических форм для
            выпечки, задающих стандарты для элегантной сервировки стола и
            приготовлении в духовке, — наши коллекции созданы для того, чтобы
            вдохновить вас накрывать стол с душой и дольше оставаться за ним с
            теми, кого вы любите.
          </p>
        </div>
      </div>

      <div className="flex flex-row-reverse max-md:flex-col justify-between">
        <div className="md:w-1/2">
          <img
            src="https://zwilling.ru/upload/iblock/608/gcjipfv5y1xn103cd05lnlmjc2clsw5a.webp"
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 text-center p-4 space-y-4 flex-col justify-center bg-[#93272C] text-white">
          <h1 className="md:text-3xl text-lg font-normal">
            Сделано во Франции
          </h1>
          <p>
            Неслучайно французская посуда STAUB пользуется популярностью во всем
            мире – от лучших международных ресторанов до миллионов домов. Везде,
            где есть STAUB, вас ждет вкусная еда, отличная компания и приятное
            времяпрепровождение.
          </p>
        </div>
      </div>

      <div className="flex max-md:flex-col justify-between">
        <div className="md:w-1/2">
          <img
            src="https://zwilling.ru/upload/iblock/a89/cqfwjded5oupxi8nvhwvsjjczamg05vn.webp"
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 text-center p-4 space-y-4 flex-col justify-center bg-[#92ACA0] text-white">
          <h1 className="md:text-3xl text-lg font-normal">
            Радость, которая идет от сердца
          </h1>
          <p>
            Наша продукция отвечает самым высоким стандартам качества,
            функциональности, дизайна и, прежде всего, обеспечивает превосходные
            результаты приготовления. Чугунные и керамические изделия STAUB
            прекрасно впишутся на вашу кухню и на красиво сервированный стол.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandStaub;
