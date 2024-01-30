"use client";
import { NextPage } from "next";
import Pagination from "@/components/UI/Pagination";
import { useState, SetStateAction, useEffect } from "react";
import Product from "@/components/Product";
import MainLayout from "@/layouts/MainLayout";
import { useUser } from "@/context/user";
import { useProductStore } from "@/stores/product";
import { useRouter } from "next/navigation";
import Loader from "../UI/Loader";
import Button from "../UI/Button";
import withRoleCheck from "@/helpers/withRoleCheck";
import { LoadingSkeleton } from "../UI/LoadingSkeleton";

const HomePage: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const { allProducts, setAllProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 12;

  const paginate = (pageNumber: SetStateAction<number>) => {
    setIsProductLoading(true);
    setCurrentPage(pageNumber);
    setTimeout(() => {
      setIsProductLoading(false);
    }, 2000);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!contextUser?.user) return router.replace("/login");
      await setAllProducts();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <Loader />
      ) : allProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <div className="flex flex-col items-center justify-center h-[50vh] w-[80%] sm:w-[476px] ">
            <h4 className="text-H4-03 font-normal text-cod-gray-cg-600 mb-3.5 ml-2.5">
              No Products Available
            </h4>
            <Button href="/" size="lg" fullWidth>
              Go to Homepage
            </Button>
          </div>
        </div>
      ) : (
        <>
          <section className="flex flex-col mb-28 px-5">
            <h1 className="text-H4-03 sm:text-H2-03 text-cod-gray-cg-600 my-10">
              Hi <span>{contextUser?.user?.name.split(" ")[0]}</span> Start
              Shopping
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px]">
              {currentItems.map((product, i) =>
                isProductLoading ? (
                  <LoadingSkeleton key={i} />
                ) : (
                  <Product
                    key={product.$updatedAt}
                    {...product}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                )
              )}
            </div>
          </section>
          {allProducts.length >= itemsPerPage && (
            <div className="mb-[60px]">
              <Pagination
                totalItems={allProducts.length}
                itemsPerPage={itemsPerPage}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default withRoleCheck(HomePage, ["buyer"]);
