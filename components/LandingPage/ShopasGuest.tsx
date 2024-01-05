import { NextPage } from "next";
import Product from "../Product";
import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/product";
import { useUser } from "@/context/user";
import { LoadingSkeleton } from "../UI/LoadingSkeleton";

const ShopasGuest: NextPage = () => {
  const { allProducts, setAllProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setAllProducts();
    setIsLoading(false);
  }, []);

  return (
    <section className="overflow-hidden mx-auto max-w-[1313px]">
      <div className="flex flex-col pb-1 items-start gap-10 my-32">
        <h1 className="text-H2-03 text-cod-gray-cg-600">Shop as a Guest</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-[60px]">
          {!isLoading ? (
            allProducts
              .slice(0, 6)
              .map((product) => <Product key={product.$id} {...product} />)
          ) : (
            <>
              <LoadingSkeleton />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopasGuest;
