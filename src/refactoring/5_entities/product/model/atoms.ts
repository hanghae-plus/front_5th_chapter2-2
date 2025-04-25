import { atomWithStorage } from "jotai/utils";

import { Product } from "../../../6_shared/types";
import { initialProducts } from "./constants";

export const productsAtom = atomWithStorage<Product[]>(
  "products",
  initialProducts
);
