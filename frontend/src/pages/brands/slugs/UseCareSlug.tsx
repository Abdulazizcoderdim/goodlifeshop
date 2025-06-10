import { useParams } from "react-router-dom";
import BrendNewsCard from "../brend-news-card";
import { motion } from "framer-motion";

const data = [
  {
    title: "BALLARINI - ИННОВАЦИИ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/b7f/300_210_2/ew0pe1xtjdmc0n7uzb6m11nh1py1c3d9.webp",
    link: "/culinary-world/o-kompanii/ballarini-innovation",
  },
  {
    title: "BALLARINI - ПРОИЗВОДСТВО",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/a56/300_210_2/bhxna32mst3wryizzzgwywdxfx3sydgh.webp",
    link: "/culinary-world/o-kompanii/ballarini-production",
  },
  {
    title: "BALLARINI - НАШИ ЦЕЛИ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/7e7/300_210_2/t71flryobfo2j5qofleohkr8605u850x.webp",
    link: "/culinary-world/o-kompanii/ballarini-purpose",
  },
];

const UseCareSlug = () => {
  const { slug } = useParams();

  const render = () => {
    switch (slug) {
      case "stay-sharp-how-to-sharpen-your-knives":
      case "use-and-care-your-cookware-it-s-a-pleasure":
      case "a-knife-for-life-use-and-care-your-knives":
        return {
          imgUrl:
            "https://zwilling.ru/upload/iblock/593/jt7kkzv6xzdqiy8d0e7js1mejr4a7plr.jpg",
          title: "ПРОДЛИТЕ ЖИЗНЬ ВАШЕГО НОЖА",
          desc: "Качество ножей – один из важнейших вопросов для нас. Если Вы солидарны с нами, то ухаживайте за Вашими ножами, чтобы они прослужили Вам как можно дольше.",
          topics: [
            {
              title: "ВЫБИРАЙТЕ ПРАВИЛЬНЫЕ ПОВЕРХНОСТИ",
              content: [
                {
                  title: "РАЗДЕЛОЧНЫЕ ДОСКИ",
                  desc: "Возможно, Вы даже не догадываетесь о том, что, неправильно выбрав доску, можно легко повредить нож, так как при резке Вы касаетесь не только продукта, но и поверхности для резки. Хорошая новость заключается в том, что найти качественную разделочную доску не так сложно. Все, что от Вас требуется, – просто продолжить чтение.",
                  imageUrl:
                    "https://zwilling.ru/images/culinary-world/zwilling-use-and-care-knives-cutting-board-2-1070-510.jpg",
                },
              ],
            },
            {
              title: "ЧИСТКА НОЖЕЙ",
              content: [
                {
                  title: "ПОКАЖИТЕ ВАШУ ЗАБОТУ",
                  desc: "Все ножи ZWILLING можно мыть в посудомоечной машине. Но в целом мы не рекомендуем делать это из-за риска сокращения их срока службы или ухудшения качества режущей кромки.",
                  imageUrl:
                    "https://zwilling.ru/images/culinary-world/zwilling-use-and-care-knives-cutting-board-2-1070-510.jpg",
                },
              ],
            },
          ],
        };

      default:
        break;
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
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

      <div className="flex uppercase max-w-5xl px-4 mx-auto pb-10 sm:text-sm  text-xs  items-center gap-5">
        <p className="font-bold cursor-pointer">Jump To:</p>
        {render()?.topics?.map((topic, i) => (
          <p
            key={i}
            onClick={() => scrollToSection(topic.title)}
            className="cursor-pointer"
          >
            {topic.title}
          </p>
        ))}
      </div>

      <div className="space-y-6">
        {render()?.topics?.map((topic, i) => (
          <motion.div
            id={topic.title}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            key={i}
            className="fadeUp max-w-5xl mx-auto px-16 py-10 flex flex-col gap-5 bg-white"
          >
            <h1 className="uppercase font-bold md:text-2xl text-lg">
              {topic.title}
            </h1>

            <div className="flex max-md:flex-col gap-4">
              <img
                loading="lazy"
                className="md:w-1/2"
                src={topic.content[0].imageUrl}
                alt=""
              />
              <div className="flex md:w-1/2 flex-col gap-3">
                <h1 className="font-bold text-lg">{topic.content[0].title}</h1>
                <p className="text-sm">{topic.content[0].desc} </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 custom-container py-16">
        {data.map((item, i) => (
          <BrendNewsCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default UseCareSlug;
