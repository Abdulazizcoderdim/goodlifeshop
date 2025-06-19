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
      value: "+375291778768",
    },
    {
      label: "E-Mail",
      value: "Alkor-opt@tut.by",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-starttext-start space-y-6">
        <ContactCard
          title="Общество с ограниченной ответственностью АлькорКлимат"
          details={officialDetails}
        />
        <ContactCard
          title="Интернет-магазин премиальной Европейской посуды."
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
