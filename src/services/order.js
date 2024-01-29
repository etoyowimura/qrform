import instance from "./api";

export const orderController = {
  async read() {
    const { data } = await instance.get(`get-order-number/`);
    return data;
  },
};
