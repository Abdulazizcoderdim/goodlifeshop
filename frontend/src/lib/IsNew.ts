import { differenceInDays } from "date-fns";

const isNew = (createdAt: string) => {
  return differenceInDays(new Date(), new Date(createdAt)) <= 7;
};

export default isNew;
