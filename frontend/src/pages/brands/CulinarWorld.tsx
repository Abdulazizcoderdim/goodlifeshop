import { BookText } from "lucide-react";

const CulinarWorld = () => {
  return (
    <div className="bg-gray">
      <img
        loading="lazy"
        src="https://zwilling.ru/upload/iblock/c74/f3pqtfb73t3nt2beh4plb3wupuc8cqe4.jpg"
        className="w-full"
        alt=""
      />

      <div className="custom-container mt-10">
        <div className="md:p-10 flex max-md:flex-col bg-white gap-5 p-5">
          <h1 className="text-lg font-bold">
            ЛЮБОВЬ К ПУТЕШЕСТВИЯМ ДОБРО ПОЖАЛОВАТЬ
          </h1>
          <p className="text-lg font-normal">
            ZWILLING – это целая палитра брендов со всего мира. С нами вы
            откроете для себя удивительный сплав культур, традиций и кухни
            разных стран. Попробуйте рецепты из Франции. Освойте японскую школу
            обращения с ножом. Или просто откройте для себя новые горизонты.
            Целый мир ароматных блюд ждет ваших открытий, оцените на вкус.
          </p>
        </div>
      </div>

      <div className="text-center custom-container w-full sm:mt-20 mt-10 pb-10">
        <h1 className="text-lg uppercase font-bold mb-10">Интересное</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col justify-center text-center gap-4 p-5 bg-white">
            <BookText className="mx-auto" size={50} />
            <p className="text-lg uppercase font-bold">История бренда</p>
          </div>
          <div className="flex justify-center flex-col text-center gap-4 p-5 bg-white">
            <svg
              className="w-20 h-20 mx-auto"
              version="1.1"
              id="Layer_Folder_8"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              xmlLang="preserve"
            >
              <path
                className="st8"
                d="M82.7,56.9L82.7,56.9l-16.2,6.5v-6.1H51.8l-12-6.8L27.5,52v-3.2h-15v30.3h15v-4.7L55,80.9l32.5-14.5L82.7,56.9z 	 M24.4,76h-8.8V52h8.8V76z M54.7,77.6l-27.1-6.4V55.2l11.7-1.5L51,60.4h12.4v5.4H46.3v3.1h20.2v-2.2l14.7-5.9l2,4L54.7,77.6z 	 M55.4,44.4l1.2,1.4l1.2-1.3c0,0,7.4-8.3,11-12.4c1.2-1.4,2-3.2,2-5.1c0-4.3-3.5-7.8-7.8-7.8c-2.8,0-4.9,0.9-6.3,3.2 	c-1.4-2.3-3.4-3.2-6.2-3.2l0,0c-4.3,0-7.8,3.5-7.8,7.8c0,2.3,1.2,4.2,2.5,5.7C48.5,36.3,55.4,44.4,55.4,44.4z M50.3,22.2L50.3,22.2 	c2.6,0,4.7,2.1,4.7,4.6h3.1c0-2.6,2.1-4.6,4.7-4.6s4.7,2.1,4.7,4.6c0,1.1-0.4,2.2-1.2,3.1c-3.2,3.6-8.5,9.6-9.8,11.1 	c-1.3-1.5-6.1-7.2-9.3-10.6c-1.1-1.1-1.7-2.3-1.7-3.6C45.6,24.3,47.7,22.2,50.3,22.2z"
              ></path>{" "}
            </svg>
            <p className="text-lg uppercase font-bold">Использование и уход</p>
          </div>
          <div className="flex flex-col justify-center text-center gap-4 p-5 bg-white">
            <BookText className="mx-auto" size={50} />
            <p className="text-lg uppercase font-bold">История бренда</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulinarWorld;
