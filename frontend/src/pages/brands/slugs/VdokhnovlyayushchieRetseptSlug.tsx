import { useParams } from "react-router-dom";
import BrendNewsCard from "../brend-news-card";
import { useEffect, useState } from "react";
import type { IPosts } from "@/types";
import api from "@/http/axios";

// const data = [
//   {
//     id: "1",
//     title: "BALLARINI - ИННОВАЦИИ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/b7f/300_210_2/ew0pe1xtjdmc0n7uzb6m11nh1py1c3d9.webp",
//     link: "/culinary-world/o-kompanii/ballarini-innovation",
//     category: "recipes",
//   },
//   {
//     id: "2",
//     title: "BALLARINI - ПРОИЗВОДСТВО",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/a56/300_210_2/bhxna32mst3wryizzzgwywdxfx3sydgh.webp",
//     link: "/culinary-world/o-kompanii/ballarini-production",
//     category: "recipes",
//   },
//   {
//     id: "3",
//     title: "BALLARINI - НАШИ ЦЕЛИ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/7e7/300_210_2/t71flryobfo2j5qofleohkr8605u850x.webp",
//     link: "/culinary-world/o-kompanii/ballarini-purpose",
//     category: "recipes",
//   },
// ];

const VdokhnovlyayushchieRetseptSlug = () => {
  const { slug } = useParams();

  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 3,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchPosts(pagination.number);
  }, []);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/posts?page=${page}&size=${pagination.size}&category=recipes`
      );
      setPosts(res.data.content);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(loading);

  const render = () => {
    switch (slug) {
      case "ustritsy-lezh-kap-ferre-po-retseptu-restorana-chez-boulan":
        return {
          order: 1,
          imgUrl:
            "https://zwilling.ru/upload/iblock/f77/s03zf1sq4fwg5i5gkbks9ayceu40a8kf.jpg",
          title: "УСТРИЦЫ ЛЕЖ-КАП-ФЕРРЕ ПО РЕЦЕПТУ РЕСТОРАНА CHEZ BOULAN",
          desc: "В ресторане Chez Boulan мы смогли насладиться не только фантастическим видом на океан, но и коронным блюдом ресторана - свежими устрицами.",
          ing: [
            "60 мл / ¼ стакана винного уксуса",
            "1 чайная ложка мелко нарубленного лука-шалота",
            "молотый черный перец",
            "6-12 свежих французских устриц (предпочтительно из Кап-Ферре)",
            "1 лимон",
            "несколько мелко нарезанных листьев свежей мяты",
          ],
          mtop: [
            "Для соуса смешайте в небольшой чаше уксус и лук-шалот и приправьте щепоткой перца по вкусу. Выложите устрицы на большое блюдо и употребляйте в свежем виде с соком лимона, щепоткой мяты или сбрызгивая соусом – и обязательно с бокалом охлажденного белого вина!",
          ],
        };
      case "bretonskiy-goluboy-omar-v-souse-bisk":
        return {
          order: 2,
          imgUrl:
            "https://zwilling.ru/upload/iblock/e3e/9ai5igtod3bxr1f2z2n912sovcef29vv.jpg",
          title: "БРЕТОНСКИЙ ГОЛУБОЙ ОМАР В СОУСЕ БИСК",
          desc: "Биск с бретонским омаром – блюдо, как нельзя лучше передающее атмосферу средиземноморского побережья Франции, - превосходный вариант для приготовления в нашей кокотнице.",
          ing: [
            "1 голубой омар (живой), ок. 800 гр / 1 ¾ фунтов (или американский омар)",
            "2 столовые ложки оливкового масла",
            "2 луковицы шалота, мелко порубить",
            "1 морковь среднего размера, разрезать пополам",
            "2 зубчика чеснока, мелко порубить",
            "1 чайная ложка томатной пасты",
            "1 средняя веточка свежего тимьяна",
            "1 лавровый лист",
            "15 гр / 0.5 унции петрушки",
            "400 гр / 14 унций помидоров, очищенных от кожицы",
            "200 мл / ¾ стакана и 1 ст. ложка белого сладкого вина",
            "1 чайная ложка молотого Эспелетского перца",
            "400 мл / 1 ⅔ стакана сметаны",
            "морская соль",
            "молотый черный перец",
            "петрушка для украшения",
          ],
          mtop: [
            "Для приготовления омара высокую кастрюлю или кокотницу (достаточного размера, чтобы вместить омара целиком) наполните водой на 3/4. Доведите воду до интенсивного кипения и обильно посолите. Проткните голову омара ножом и быстро поместите его в кипящую воду головой вниз. Закройте крышкой и снова доведите до кипения. Отваривайте 10-12 минут. Затем достаньте омара из воды и положите на разделочную доску. Когда омар немного остынет, отделите клешни от туловища. С помощью щипцов для омара или ножниц надломите клешню, аккуратно извлеките мясо и отложите его. Придерживая туловище омара одной рукой, другой рукой отогните хвост и аккуратно отделите его. Печень омара нужно вынуть и выбросить. У женской особи выскоблите икру и отложите в сторону. Извлеките мясо из панциря. С помощью острого ножа удалите кишечную вену из мяса хвоста и быстро промойте его проточной водой. Все мясо и раковины отложите в сторону.",
            "Очистите и нарубите лук, морковь и чеснок.",
            "В средней кастрюле или кокотнице нагрейте половину порции оливкового масла на среднем огне. Всыпьте лук, морковь и чеснок и пассеруйте около минуты.",
            "Добавьте тимьян, лавровый лист, петрушку, панцирь омара и томатную пасту и готовьте около минуты. Затем добавьте помидоры и вино, приправьте перцем Эспелет, солью и черным перцем по вкусу. Закройте крышкой и готовьте на среднем огне примерно 20 минут. Затем уменьшите огонь и добавьте сметану и отложенную икру омара (при наличии).",
            "Процедите полученную овощную смесь с омаром через мелкое сито в сотейник, с силой прижимая гущу большой ложкой. Голову и хвост омара оставьте для подачи на блюде. Если Вы хотите получить более густой соус, готовьте сцеженную массу на медленном огне до загустения.",
            "Нагрейте в большой кастрюле остаток оливкового масла на среднем огне и обжарьте мясо омара по 1 минуте с каждой стороны, затем приправьте его щепоткой перца Эспелет. Тщательно промойте панцирь головы и хвоста. Выложите на блюдо, полейте омара соусом биск и украсьте веточкой петрушки, присыпьте перцем Эспелет. Подавать с панцирем.",
          ],
        };
      case "nudi-so-shpinatom-i-tvorogom":
      case "nokki-s-motsarelloy-i-tomatami-konfi":
      case "bifshteks-po-florentiyski":
      case "govyazhi-shcheki-s-ovoshchami-i-sladkim-kartofelem":
      case "aromatnyy-khleb-na-zakvaske":
        return {
          order: 4,
          imgUrl:
            "https://zwilling.ru/upload/iblock/d33/c8bvcc1ft0h6z0jl4bkv6owqwzi7tsm1.jpg",
          title: "АРОМАТНЫЙ ХЛЕБ НА ЗАКВАСКЕ",
          desc: "Флориан Домбергер – хлебопек из Берлина, он поделился с нами своим вкусным рецептом.",
          ing: [
            "50 г / 1.75 унций хлебной закваски",
            "425 г / 3.33 чашки хлебной муки",
            "50 г / 0.5 чашки цельно-зерновой муки из полбы (пшеница спельта)",
            "21 г / 0.75 унций свежих дрожжей",
            "400 мл / 1.75 чашек теплой воды",
            "12.5 g г / 0.5 унций морской соли",
            "мука для обсыпки",
          ],
          mtop: [
            "Воду комнатной температуры, свежие дрожжи и хлебную закваску взбейте в большой миске до полного растворения дрожжей.",
            "Добавьте хлебопекарную муку, цельно-зерновую муку из полбы и соль. Размешайте кухонной лопаткой до однородной массы теста.",
            "При температуре 25°C/75°F дайте постоять около 40 – 45 мин. Перенесите тесто на обсыпанную мукой поверхность и аккуратно замесите тесто руками.",
            "Поместите тесто в кокотницу и дайте подняться при температуре 25°C/75°F, примерно 30 –40 мин. или до увеличения объема вдвое.",
            "Разогрейте духовку до 250°C/475°F.",
            "Поместите глубокий противень для выпечки на нижний уровень духовки и налейте туда немного воды. Далее, поставьте решетчатую полку на уровень сверху. Сделайте крестообразный надрез сверху на тесте для выпечки хлеба и поставьте кокотницу с тестом в духовку. Выпекайте хлеб в кокотнице около 35 – 45 мин., в процессе выпечки не забывайте приоткрывать дверцу духовки наполовину, чтобы выпустить пар, и каждый раз снова ее закрывайте.",
            "Вынимайте хлеб из духовки, дайте полностью остыть перед нарезкой. Приятного аппетита!",
          ],
        };

      default:
        break;
    }
  };

  return (
    <div className="bg-gray">
      <div className="h-96 px-4">
        <img
          loading="lazy"
          className="object-cover w-full h-96"
          src={render()?.imgUrl || ""}
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-16 py-10 -translate-y-14 flex flex-col text-center gap-5 bg-white">
        <h1 className="md:text-3xl text-lg font-bold uppercase">
          {render()?.title || ""}
        </h1>
        <p>{render()?.desc || ""}</p>
      </div>

      <div className="max-w-5xl mx-auto px-16 py-10 flex flex-col text-center gap-5 bg-white">
        <div className="flex flex-col font-bold items-center text-center">
          <img
            loading="lazy"
            src="/servings.gif"
            width={50}
            height={50}
            alt=""
          />
          <p>ПОРЦИИ</p>
          <p>{render()?.order || ""}</p>
        </div>
        <div className="flex max-md:flex-col gap-5">
          <div className="md:w-1/2 text-start">
            <h1 className="font-medium text-lg">ИНГРЕДИЕНТЫ</h1>
            <ul className="list-disc mt-5">
              {render()?.ing.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="w-full text-start">
            <h1 className="font-medium text-lg">СПОСОБ ПРИГОТОВЛЕНИЯ</h1>
            <ul className="space-y-2 mt-5">
              {render()?.mtop.map((item, i) => (
                <li key={i}>
                  {i + 1}. {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 custom-container py-16">
        {posts.map((item, i) => (
          <BrendNewsCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default VdokhnovlyayushchieRetseptSlug;
