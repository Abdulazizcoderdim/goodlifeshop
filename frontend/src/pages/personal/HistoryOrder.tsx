import { Link } from "react-router-dom";

const HistoryOrder = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-sm">Текущие заказы не найдены</h1>
        <div className="flex items-center gap-5">
          <Link to={"#"} className="text-lg font-medium uppercase underline">
            Посмотреть текущие заказы
          </Link>
          <Link to={"#"} className="text-lg font-medium uppercase underline">
            Посмотреть историю отмененных заказов
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrder;
