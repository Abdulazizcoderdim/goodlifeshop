import type { IPosts } from "@/types";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  item: IPosts;
  key: number;
}

const BrendNewsCard = ({ item, key }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(item.link || "")}
      key={key}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          loading="lazy"
          src={item.imageUrl}
          alt="BALLARINI Production"
          width={400}
          height={300}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <MoveRight
          size={30}
          className="group-hover:text-gray-600 transition-colors"
        />
      </div>
    </div>
  );
};

export default BrendNewsCard;
