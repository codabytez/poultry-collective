"use client";
/* eslint-disable @next/next/no-img-element */
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import Loader from "../UI/Loader";
import MainLayout from "@/layouts/MainLayout";
import Product from "../Product";
import { NextPage } from "next";
import { productDetailTypes } from "@/@types";
import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { notify } from "../UI/Toast";
import useUpdateProductQuantity from "@/hooks/useUpdateProductQuantity";

const ProductDescription: NextPage<productDetailTypes> = ({ params }) => {
  const contextUser = useUser();
  const Router = useRouter();
  const { removeProductQuantity } = useUpdateProductQuantity();
  const { productsById, setProductsById, allProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const { addToCart, cart, loadUserCart } = useCartStore();
  const [enteredQuantity, setEnteredQuantity] = useState("");

  useEffect(() => {
    if (contextUser.user) {
      setIsLoading(true);
      try {
        setProductsById(params.productid);
      } catch (error) {
        throw new Error("Failed to load product.");
      } finally {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const onAddToCart = async () => {
    setLoader(true);
    if (!contextUser.user) return Router.push("/login");
    const { $id, product_weight, product_price, product_name, product_image } =
      productsById;
    const existingItem = cart.find(
      (item) => item.product_id === productsById.$id
    );
    if (existingItem) {
      notify({
        message: "Item already in cart.",
        type: "error",
      });
      setLoader(false);
      return;
    }

    try {
      await removeProductQuantity(
        productsById?.$id,
        String(
          Number(productsById?.quantity_available) - Number(enteredQuantity)
        )
      );

      addToCart({
        user_id: contextUser.user.id,
        $id,
        quantity: "1",
        product_weight,
        product_price,
        product_name,
        product_image: product_image[0],
      });
      if (contextUser.user) return loadUserCart(contextUser.user.id);
    } catch (error) {
      console.error("Error adding to cart:", error);

      throw new Error("Failed to add the item to the cart. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <section className="max-w-[1312px] m-auto shrink-0 bg-light-green-shade p-14 h-[724px] flex gap-16 mb-16 ">
        <div>
          <img
            src={productsById?.imageUrl}
            alt={productsById?.product_name}
            className="w-[537px] h-[496px] object-cover"
          />
        </div>

        <div className="flex flex-col gap-24">
          <div>
            <h3 className="text-H3-03 text-cod-gray-cg">
              {productsById?.product_name}
            </h3>

            <h4 className="w-[590px] h-[183.5px] shrink-0 text-cod-gray-cg-500 text-H4-03 font-normal">
              {productsById?.product_details}
            </h4>
          </div>

          <div className="w-[425px] flex flex-col gap-5">
            <h3 className="text-H3-03 text-cod-gray-cg">Select Quantity</h3>

            <Input
              type="text"
              placeholder="Enter quantity"
              fullWidth
              onChange={(e: any) => setEnteredQuantity(e.target.value)}
              disabled={loader}
            />

            <Button
              size="lg"
              fullWidth
              onClick={onAddToCart}
              isLoading={loader}
              disabled={enteredQuantity === ""}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 mb-20 m-auto">
        <h3 className="text-H3-03 text-cod-gray-cg w-full">See Other Items</h3>

        <div className="flex flex-wrap gap-4">
          {allProducts.slice(0, 3).map((item) => (
            <Product key={item.id} {...item} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductDescription;
