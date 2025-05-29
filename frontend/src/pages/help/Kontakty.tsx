const Kontakty = () => {
  const officialDetails = [
    {
      label: "Юридический адрес",
      value:
        "Российская Федерация, 127015, г. Москва, ул. Новодмитровская, дом 2, корпус 2, ПОМЕЩЕНИЕ 23И.",
    },
    { label: "ОГРН", value: "1107746304181" },
    { label: "ИНН", value: "7719747852" },
    { label: "Телефон/Факс", value: "8 (499) 624-10-04" },
    { label: "E-Mail", value: "info@zwilling.ru" },
    { label: "График работы", value: "понедельник - пятница 10:00 - 18:00" },
  ];

  const onlineStoreDetails = [
    {
      label: "Адрес",
      value:
        "Российская Федерация, 127015, г. Москва, ул. Новодмитровская, дом 2, корпус 2, ПОМЕЩЕНИЕ 23И.",
    },
    { label: "Телефон", value: "8 (495) 724-85-98" },
    { label: "Телефон", value: "8 (800) 600-47-36" },
    { label: "E-Mail", value: "shop@zwilling.ru" },
    { label: "График работы", value: "понедельник - пятница 10:00 - 18:00" },
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
          title="Официальное представительство Zwilling"
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
