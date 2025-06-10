import Category from "@/components/home/category";

const BrandZwilling = () => {
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
            src="https://zwilling.ru/upload/iblock/867/5o2rth78gd5yttzobsgi1791pfmvca3k.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="flex justify-center text-center flex-col mt-10">
        <div className="flex justify-center">
          <img loading="lazy" src="/zwilling.webp" className="h-16" alt="" />
        </div>
        <h1 className="mt-10 md:text-3xl text-lg uppercase font-normal">
          Каталог товаров ZWILLING
        </h1>

        <Category />

        <div className="flex max-md:flex-col justify-between gap-5">
          <div className="md:w-1/2">
            <img loading="lazy" src="/zw1.webp" alt="" />
          </div>
          <div className="flex md:w-1/2 text-center space-y-4 flex-col justify-center">
            <h1 className="md:text-3xl text-lg font-normal">
              НАСЛАЖДАЙТЕСЬ КАЖДЫМ ПРИГОТОВЛЕННЫМ БЛЮДОМ.
            </h1>
            <p>
              В ZWILLING мы верим в то, что каждый прием пищи должен быть
              осмысленным. Говорят, что кухня – это сердце дома. И мы не можем
              не согласиться с этим утверждением.
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse mt-5 max-md:flex-col justify-between gap-5">
          <div className="md:w-1/2">
            <img loading="lazy" src="/zw2.webp" alt="" />
          </div>
          <div className="flex md:w-1/2 text-center space-y-4 flex-col justify-center">
            <h1 className="md:text-3xl text-lg font-normal">
              ЧТО-ТО ОСОБЕННОЕ ДЛЯ КАЖДОЙ КУХНИ
            </h1>
            <p>
              Попробуйте что-то новое и проявите свои лучшие качества на кухне.
              То, что началось с традиционного изготовления ножей, переросло в
              широкий ассортимент инновационных продуктов для современного
              приготовления еды. Высококачественная посуда, ножи, кухонные
              принадлежности и бытовая техника для улучшения вашей повседневной
              жизни на кухне - все это разработано компанией ZWILLING в
              Германии.
            </p>
          </div>
        </div>
        <div className="flex  mt-5 max-md:flex-col justify-between gap-5 mb-10">
          <div className="md:w-1/2">
            <img loading="lazy" src="/zw3.webp" alt="" />
          </div>
          <div className="flex md:w-1/2 text-center space-y-4 flex-col justify-center">
            <h1 className="md:text-3xl text-lg font-normal">
              ZWILLING ENFINIGY. ОСНОВАНО НА ОПЫТЕ – ПОДТВЕРЖДЕНО ЭКСПЕРТАМИ
            </h1>
            <p>
              Высококачественные электроприборы, созданные с вниманием к деталям
              и нашей страстью к совершенству. ZWILLING Enfinigy сочетает в себе
              интуитивно понятную функциональность и новейшие технологии. В
              сочетании с выдающимся дизайном, это привело к созданию
              ассортимента продукции, отвечающей самым высоким стандартам –
              вашим.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandZwilling;
