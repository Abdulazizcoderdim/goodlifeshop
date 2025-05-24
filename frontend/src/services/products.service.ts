import api from "@/http/axios";

export const getProducts = async () => {
  try {
    const res = await api.get("/products");

    if (!res.data) {
      throw new Error("Products not found");
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
