const Kontakty = () => {
  const officialDetails = [
    {
      label: "Наименование",
      value: "ООО «АлькорКлимат»",
    },
    {
      label: "Юридический адрес",
      value:
        "220087, Республика Беларусь, г.Минск, пр-кт Дзержинского д.115, оф.444",
    },
    {
      label: "р/с",
      value: "BY35BPSB30123200100159330000",
    },
    {
      label: "Банк",
      value: "ОАО «СБЕР БАНК» Г.МИНСК",
    },
    {
      label: "БИК",
      value: "BPSBBY2X",
    },
    {
      label: "УНП",
      value: "193056285",
    },
    {
      label: "E-Mail",
      value: "Alkor-opt@tut.by",
    },
  ];

  const onlineStoreDetails = [
    {
      label: "Моб. тел.",
      value: "+375296276521",
    },
    {
      label: "Моб. тел.",
      value: "+375291778768",
    },
    {
      label: "E-Mail",
      value: "Alkor-opt@tut.by",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-start text-gray-900">
        Контактная информация
      </h1>
      <p className="text-start text-gray-600">
        Общество с ограниченной ответственностью «Цвиллинг Джей. Эй. Хенкельс
        Рус»
      </p>
      <div className="flex flex-col items-starttext-start space-y-6">
        <ContactCard
          title="Цвиллинг Джей.Эй. Хенкельс Рус"
          details={officialDetails}
        />
        <ContactCard
          title="Интернет-магазин ZWILLING"
          details={onlineStoreDetails}
        />
      </div>
    </div>
  );
};

const ContactCard: React.FC<{
  title: string;
  details: { label: string; value: string }[];
}> = ({ title, details }) => {
  return (
    <>
      <h2 className="text-2xl text-start font-bold text-gray-800 mb-4">
        {title}
      </h2>
      {details.map((detail, index) => (
        <p key={index} className="text-gray-700 mb-2">
          <span className="font-semibold">{detail.label}:</span> {detail.value}
        </p>
      ))}
    </>
  );
};

export default Kontakty;
