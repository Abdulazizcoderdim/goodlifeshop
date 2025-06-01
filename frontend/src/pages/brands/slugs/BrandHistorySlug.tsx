import { useParams } from "react-router-dom";

const BrandHistorySlug = () => {
  const { slug } = useParams();

  const render = () => {
    switch (slug) {
      case "ballarini-innovation":
        return [
          {
            title: "Инновации по-итальянски.",
            desc: "",
            imgUrl:
              "https://zwilling.ru/upload/resize_cache/iblock/b7f/1588_397_1/ew0pe1xtjdmc0n7uzb6m11nh1py1c3d9.webp",
          },
          {
            title: "Готовьте так, как вы умеете.",
            desc: "Возможно, наши итальянские корни подарили нам особый кулинарный вкус. Мы считаем, что приготовление пищи должно приносить удовольствие. Так что готовьте с легкостью, готовьте с amore и готовьте с друзьями и семьей. Неважно, что вы готовите и как вы это готовите – главное, чтобы это было весело и на посуде было написано BALLARINI.",
            imgUrl:
              "https://zwilling.ru/upload/brands/ballarini/articles/BAL_BLP_Brand_PURPOSE_2100x1400px3-768.webp",
          },
          {
            title: "Да здравствует простота",
            desc: "В Италии готовят с душой – не напрягаясь и без излишеств. Только свежие ингредиенты, щепотка фантазии и большая порция Passione. Это все, что нужно, чтобы насладиться Cucina Italiana. Это не только просто, но и очень molto bene.",
            imgUrl:
              "https://zwilling.ru/upload/brands/ballarini/articles/BAL_BLP_Brand_PRODUCTION_2100x1400px6-768.jpg",
            bgColor: "#D6D2C4",
          },
        ];
      case "ballarini-production":
        return [
          {
            title: "Кусочек Италии, созданный для вас.",
            desc: "",
            imgUrl:
              "https://zwilling.ru/upload/resize_cache/iblock/a56/1588_397_1/bhxna32mst3wryizzzgwywdxfx3sydgh.webp",
          },
          {
            title: "Готовьте так, как вы умеете.",
            desc: "Возможно, наши итальянские корни подарили нам особый кулинарный вкус. Мы считаем, что приготовление пищи должно приносить удовольствие. Так что готовьте с легкостью, готовьте с amore и готовьте с друзьями и семьей. Неважно, что вы готовите и как вы это готовите – главное, чтобы это было весело и на посуде было написано BALLARINI.",
            imgUrl:
              "https://zwilling.ru/upload/brands/ballarini/articles/BAL_BLP_Brand_PURPOSE_2100x1400px3-768.webp",
          },
          {
            title: "Да здравствует простота",
            desc: "В Италии готовят с душой – не напрягаясь и без излишеств. Только свежие ингредиенты, щепотка фантазии и большая порция Passione. Это все, что нужно, чтобы насладиться Cucina Italiana. Это не только просто, но и очень molto bene.",
            imgUrl:
              "https://zwilling.ru/upload/brands/ballarini/articles/BAL_BLP_Brand_PRODUCTION_2100x1400px6-768.jpg",
            bgColor: "#D6D2C4",
          },
        ];
      case "ballarini-purpose":
        return [
          {
            title: "Радость от итальянской кухни",
            desc: "",
            imgUrl:
              "https://zwilling.ru/upload/resize_cache/iblock/7e7/1588_397_1/t71flryobfo2j5qofleohkr8605u850x.webp",
          },
          {
            title: "Готовьте так, как вы умеете.",
            desc: "Возможно, наши итальянские корни подарили нам особый кулинарный вкус. Мы считаем, что приготовление пищи должно приносить удовольствие. Так что готовьте с легкостью, готовьте с amore и готовьте с друзьями и семьей. Неважно, что вы готовите и как вы это готовите – главное, чтобы это было весело и на посуде было написано BALLARINI.",
            imgUrl:
              "https://zwilling.ru/upload/brands/ballarini/articles/BAL_BLP_Brand_PURPOSE_2100x1400px3-768.webp",
          },
          {
            title: "Да здравствует простота",
            desc: "В Италии готовят с душой – не напрягаясь и без излишеств. Только свежие ингредиенты, щепотка фантазии и большая порция Passione. Это все, что нужно, чтобы насладиться Cucina Italiana. Это не только просто, но и очень molto bene.",
            imgUrl:
              "https://zwilling.ru/upload/brands/ballarini/articles/BAL_BLP_Brand_PRODUCTION_2100x1400px6-768.jpg",
            bgColor: "#D6D2C4",
          },
        ];

      default:
        break;
    }
  };

  return (
    <div className="custom-container pb-10 space-y-5">
      {render()?.map((item, index) => (
        <div
          key={index}
          className={`flex ${index % 2 !== 0 ? "flex-row-reverse" : ""} ${
            item.bgColor && "bg-[" + item.bgColor + "]"
          } max-md:flex-col justify-between gap-5`}
        >
          <div className="md:w-1/2">
            <img className="w-full" src={item.imgUrl} alt="" />
          </div>
          <div className="flex md:w-1/2 text-center space-y-4 flex-col justify-center">
            <h1 className="md:text-3xl text-lg font-normal">{item.title}</h1>
            {item.desc && <p>{item.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandHistorySlug;
