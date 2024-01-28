"use client";
/* eslint-disable @next/next/no-img-element */
import Button from "../UI/Button";
import { SelectInput } from "../UI/Input";
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
import { LoadingSkeleton } from "../UI/LoadingSkeleton";
import withRoleCheck from "@/helpers/withRoleCheck";

const ProductDescription: NextPage<productDetailTypes> = ({ params }) => {
  const contextUser = useUser();
  const Router = useRouter();
  const { removeProductQuantity } = useUpdateProductQuantity();
  const { productsById, setProductsById, allProducts, setAllProducts } =
    useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const { addToCart, cart, loadUserCart } = useCartStore();
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [areProductsLoading, setAreProductsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (contextUser.user) {
        setIsLoading(true);
        setAreProductsLoading(true);
        try {
          await setProductsById(params.productid);
          await setAllProducts();
        } catch (error) {
          throw new Error("Failed to load product.");
        } finally {
          setIsLoading(false);
          setAreProductsLoading(false);
        }
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setEnteredQuantity("");
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

      await addToCart({
        user_id: contextUser.user.id,
        $id,
        quantity: enteredQuantity,
        product_weight,
        product_price,
        product_name,
        product_image: product_image[0],
      });
      if (contextUser.user) return loadUserCart(contextUser.user.id);
      notify({
        message: "Item added to cart.",
        type: "success",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);

      throw new Error("Failed to add the item to the cart. Please try again.");
    } finally {
      setEnteredQuantity("");
      setLoader(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const generateOptions = (totalQuantity: number) => {
    const options = [];
    const step = 2;
    const maxQuantity = Math.min(totalQuantity, 10);

    for (let i = step; i <= maxQuantity; i += step) {
      options.push({ value: i.toString(), label: i.toString() });
    }

    return options;
  };

  const totalQuantity = productsById?.quantity_available;

  const options = generateOptions(totalQuantity);

  return (
    <MainLayout>
      <section className="max-w-[1312px] m-auto shrink-0 bg-light-green-shade p-14 lg:h-[724px] flex flex-col lg:flex-row gap-8 sm:gap-16 mb-16">
        <div>
          <img
            src={productsById?.imageUrl}
            alt={productsById?.product_name}
            className="w-full h-full lg:w-[537px] lg:h-[496px] object-cover"
          />
        </div>

        <div className="flex flex-col gap-8 lg:gap-24 lg:basis-1/2">
          <div>
            <h3 className="text-H5-03 md:text-H3-03 text-cod-gray-cg">
              {productsById?.product_name}
            </h3>

            <h4 className="w-[90%] xl:w-[590px] lg:h-[183.5px] py-6 lg:my-0 shrink-0 text-cod-gray-cg-500 text-BC-03 md:text-H4-03 font-normal">
              {productsById?.product_details}
            </h4>
          </div>

          <div className="w-full sm:w-[425px] flex flex-col gap-5">
            <h3 className="text-H5-03 md:text-H3-03 text-cod-gray-cg">
              Select Quantity
            </h3>

            <SelectInput
              fullWidth
              value={enteredQuantity}
              onChange={(e: any) => setEnteredQuantity(e.target.value)}
              disabled={loader}
              options={options}
              optionPlaceholder="Select Quantity"
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

      <section className="flex flex-col gap-10 mb-20 m-auto px-6">
        <h3 className="text-H5-03 md:text-H3-03 text-cod-gray-cg w-full">
          See Other Items
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px]">
          {allProducts.length && areProductsLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            : allProducts
                .filter((item) => item.$id !== params.productid)
                .slice(0, 3)
                .map((item) => <Product key={item.$id} {...item} />)}
        </div>
      </section>
    </MainLayout>
  );
};

export default withRoleCheck(ProductDescription, ["buyer"]);
