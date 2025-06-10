import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BrandBallarini = () => {
  return (
    <div className="custom-container">
      <div className="w-full">
        <video
          playsInline={true}
          autoPlay={true}
          loop={true}
          className="w-full"
          muted
        >
          <source
            src="https://zwilling.ru/upload/iblock/dfc/ne02vr118a1hw576vbq23jcrh7xmiyb4.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="flex justify-center text-center flex-col mt-10">
        <div className="flex justify-center">
          <img src="/s1.webp" className="h-16" alt="" />
        </div>
        <h1 className="mt-10 md:text-3xl text-lg font-bold">
          Каталог товаров BALLARINI
        </h1>
        <div className="flex items-center gap-5 w-full justify-center sm:mt-10 mt-5">
          <div className="flex flex-col gap-3">
            <img
              src="https://zwilling.ru/upload/uf/6d2/hkr6frxe5zfj0ws1xo93a51cp61qaw9a.webp"
              alt=""
              className="w-60"
            />
            <Button asChild variant={"default"}>
              <Link to={"/catalog/posuda"}>BALLARINI Посуда</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <img
              src="https://zwilling.ru/upload/uf/14e/2s466n85pas6tio090qo4cahc86h4iup.webp"
              alt=""
              className="w-60"
            />
            <Button asChild variant={"default"}>
              <Link to={"/catalog/aksessuary"}>BALLARINI Аксессуары</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex max-md:flex-col justify-between md:mt-20 mt-10">
        <div className="md:w-1/2">
          <img
            src="https://zwilling.ru/upload/brands/ballarini/articles/BAL_BLP_Brand_MAIN_2100x1400px-768.webp"
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 text-center space-y-4 p-4 flex-col justify-center bg-[#D6D2C4] text-black">
          <h1 className="md:text-3xl text-lg font-normal">
            Величие - только что создано.
          </h1>
          <p>
            Известность итальянской кухни неслучайна. Это потому, что еда
            готовится с душой и от всего сердца. БАЛЛАРИНИ – для тех, кто
            готовит простые и свежие блюда. Кто готовит с удовольствием. Кто
            любит поесть всей семьей. Кто проводит вечер с друзьями и идеальной
            пастой до тех пор, пока на небе не появятся звезды. Кто знает, что
            лучшие вещи часто бывают самыми простыми – но со страстью.
          </p>
        </div>
      </div>

      <div className="flex flex-row-reverse max-md:flex-col justify-between">
        <div className="md:w-1/2">
          <img
            src="https://zwilling.ru/upload/iblock/d83/6eyhw2rfjw705rhl8byjvg4x0gu9rjm1.webp"
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 text-center p-4 space-y-4 flex-col justify-center text-black">
          <h1 className="md:text-3xl text-lg font-normal">
            Родом из Ривароло, Италия.
          </h1>
          <p>
            Мы были основаны как семейная компания в 1889 году. Посредством
            нашей продукции, мы несем итальянский образ жизни на кухни по всему
            миру. Мы живем La Cucina Italiana. Мы любим готовить. Мы любим еду.
            Мы Италия.
          </p>
        </div>
      </div>

      <div className="flex max-md:flex-col justify-between">
        <div className="md:w-1/2">
          <img
            src="https://zwilling.ru/upload/iblock/982/p4qdk9wgg4vejyh6qkk67cv81hnxmm53.webp"
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 text-center p-4 space-y-4 flex-col justify-center bg-[#D6D2C4] text-black">
          <h1 className="md:text-3xl text-lg font-normal">
            Добро пожаловать в семью.
          </h1>
          <p>
            «Сделано в Италии»— для нас это больше, чем просто место на карте.
            На протяжении 130 лет, мы бережно храним наше итальянское наследие,
            семейные ценности и местные традиции. В наших продуктах есть
            частичка итальянского сердца, потому что каждый из них создан так,
            словно предназначен для нашей собственной кухни. Когда вы готовите с
            BALLARINI, вы становитесь частью нашей семьи.
          </p>
        </div>
      </div>

      <div className="flex flex-row-reverse max-md:flex-col justify-between">
        <div className="md:w-1/2">
          <img
            src="https://zwilling.ru/upload/iblock/bc1/7cyf9jrcjj6sab6dselrnmexsfvz7vpy.webp"
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 text-center p-4 space-y-4 flex-col justify-center text-black">
          <h1 className="md:text-3xl text-lg font-normal">
            Сделано в Италии. Сделано для вас.
          </h1>
          <p>
            Приготовьте вкусные блюда, которые заставят ваше сердце биться чаще
            и перенесут вас в солнечную Италию. Мы помогаем вам сделать это со
            старстью, преданностью делу и высочайшими стандартами качества. Мы
            контролируем все процессы на наших заводах, а наши сотрудники,
            болеют всей душой за BALLARINI на протяжении десятилетий. Просто
            знайте: всякий раз, когда вы увидите надпись BALLARINI, вы
            почувствуете настоящую радость жизни и безошибочный итальянский
            шарм.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandBallarini;
