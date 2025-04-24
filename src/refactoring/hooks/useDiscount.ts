import { CartItem, Discount } from "../../types";
import { getAppliedDiscount, getMaxDiscount } from "../models/discount";

export const useDiscount = () => {
    const calculateMaxDiscount = (discounts: Discount[]) => {
        return getMaxDiscount(discounts);
    };
    
    const calculateDiscount = (item: CartItem) => {
        return getAppliedDiscount(item);
    };

    return {
        calculateMaxDiscount,
        calculateDiscount,
    }
};
