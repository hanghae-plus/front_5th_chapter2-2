import { useEffect, useState } from "react";

import { debounce } from "../utils";

import { Product } from "../../types";

export const useProductSearch = (products: Product[], delay: number = 300) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Product[]>(products);

  useEffect(() => {
    const run = debounce((input: string) => {
      const lower = input.toLowerCase();
      setFiltered(
        products.filter((product) =>
          product.name.toLowerCase().includes(lower),
        ),
      );
    }, delay);

    run(query);
  }, [query, products, delay]);

  return { query, setQuery, filtered };
};
