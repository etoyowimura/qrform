import { useQuery } from "react-query";
import { orderController } from "../../services/order";

export const useOrderData = () => {
    return useQuery(
        [`get-order-number/`],
        () => orderController.read(),
        { refetchOnWindowFocus: false }
    );
};