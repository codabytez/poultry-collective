import { NextPage } from "next";
import Product from "../Product";
import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/product";
import { LoadingSkeleton } from "../UI/LoadingSkeleton";

const ShopasGuest: NextPage = () => {
  const { allProducts, setAllProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAllProducts();
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="shopAsGuest"
      className="overflow-hidden mx-auto max-w-[1413px] px-5"
    >
      <div className="flex flex-col pb-1 items-start gap-10 my-32">
        <h1 className="text-H4-03 md:text-H2-03 text-cod-gray-cg-600">
          Shop as a Guest
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px]">
          {!isLoading && allProducts.length > 0
            ? allProducts
                .slice(0, 6)
                .map((product) => <Product key={product.$id} {...product} />)
            : Array.from({ length: 6 }).map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ShopasGuest;
