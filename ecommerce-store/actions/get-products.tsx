import qs from "query-string";

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export const getProducts = async ({
  categoryId,
  colorId,
  sizeId,
  isFeatured,
}: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl(
    {
      url: URL,
      query: {
        colorId,
        categoryId,
        sizeId,
        isFeatured,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  const res = await fetch(url);

  return res.json();
};
