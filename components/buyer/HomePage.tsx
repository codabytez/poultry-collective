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

const HomePage: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const { allProducts, setAllProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setIsLoading(true);
    if (!contextUser?.user) return router.replace("/login");
    setAllProducts();
    setIsLoading(false);
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <section className="flex flex-col mb-28">
            <h1 className=" text-H2-03 text-cod-gray-cg-600 my-10">
              Hi <span>{contextUser?.user?.name}</span> Start Shopping
            </h1>

            <div className="grid grid-cols-3 gap-x-6 gap-y-[60px]">
              {currentItems.map((product) => (
                <Product key={product.$id} {...product} />
              ))}
            </div>
          </section>
          <div className="mb-[60px]">
            <Pagination
              totalItems={allProducts.length}
              itemsPerPage={itemsPerPage}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default HomePage;
