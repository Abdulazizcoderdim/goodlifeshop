import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-sm">Текущие заказы не найдены</h1>
        <Link to={"#"} className="text-lg font-medium uppercase underline">
          Посмотреть историю заказов
        </Link>
      </div>
    </div>
  );
};

export default Orders;
