"use client";
import { NextPage } from "next";
import CheckoutProduct from "./CheckoutProduct";
import MainLayout from "@/layouts/MainLayout";
import CountryDropdown from "../CountryDropdown";
import { countries } from "../countries";
import Button from "../UI/Button";
import { useState } from "react";
import { useUser } from "@/context/user";
import { useCartStore } from "@/stores/cart";
import { Input, SelectInput } from "../UI/Input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Checkout: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const { cart } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const checkoutSchema = z.object({
    city: z.string().min(2, { message: "City is required" }),
    address: z.string().min(2, { message: "Address is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    email: z.string().email({ message: "Email is required" }),
    phone: z.string().min(2, { message: "Phone is required" }),
    cardName: z.string().min(2, { message: "Card name is required" }),
    cardNumber: z.string().min(2, { message: "Card number is required" }),
    expiryDate: z.string().min(2, { message: "Expiry date is required" }),
    cvv: z.string().min(2, { message: "CVV is required" }),
  });

  const {
    register: registerCheckout,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const subtotal = cart.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  const totalWeight = cart.reduce((total, item) => {
    return total + Number(item.weight) * Number(item.quantity);
  }, 0);

  const totalQuantity = cart.reduce((total, item) => {
    return total + Number(item.quantity);
  }, 0);

  const shippingFeePerKg = 1;
  const shippingFee = totalWeight * shippingFeePerKg;
  const locationDistance = 10;

  const deliveryFee = calculateDeliveryFee(
    Number(totalQuantity),
    Number(totalWeight),
    Number(locationDistance)
  );

  function calculateDeliveryFee(
    quantity: number,
    weight: number,
    distance: number
  ) {
    const feePerKg = shippingFeePerKg;
    const feePerItem = 1;
    const feePerKm = 1;

    return feePerKg * weight + feePerItem * quantity + feePerKm * distance;
  }

  if (!contextUser.user) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <h3 className="text-H3-01 font-semibold text-center mb-4">
            You are not logged in
          </h3>
          <p className="text-SP-01 text-center mb-8">
            Please, login to continue
          </p>
          <Button size="lg" fullWidth onClick={() => router.push("/login")}>
            Login
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-16 flex gap-24">
        <section className="w-[652px] shrink-0 flex flex-col gap-6 ">
          {cart.map((product) => (
            <CheckoutProduct key={product.id} {...product} />
          ))}
        </section>

        <section>
          <div className="inline-flex flex-col pt-8 pr-40 pb-10 pl-8 items-start gap-7 rounded bg-light-green-shade w-[564px]">
            <h4 className="w-[239px] text-cod-gray-cg-600 text-H4-03">
              Order Summary
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex justify-start">
                <p className="text-cod-gray-cg-600 text-SP-03 font-semibold w-40">
                  Subtotal
                </p>
                <p className="text-cod-gray-cg-600 text-SP-03 font-semibold">
                  ${subtotal.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-start">
                <p className="text-cod-gray-cg-600 text-SP-03 font-semibold w-40">
                  Shipping
                </p>
                <p className="text-cod-gray-cg-600 text-SP-03 font-semibold">
                  $ {shippingFee.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-start">
                <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold w-40">
                  Total
                </h4>
                <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold">
                  $ {(subtotal + shippingFee).toLocaleString()}
                </h4>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-light-green-shade py-6 px-8 mt-20">
            <div className="">
              <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold mb-2">
                Delivery Address
              </h4>
              <p className="text-cod-gray-cg-600 text-SP-03 font-semibold">
                Please, enter your correct details
              </p>
              <div className="w-[500px] flex flex-col gap-5 mt-5">
                <SelectInput options={countries} fullWidth />

                <Input type="text" name="city" placeholder="City" fullWidth />

                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  inputType="textarea"
                  fullWidth
                />
              </div>
            </div>

            <div className="mt-[60px]">
              <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold mb-2">
                Contact Details
              </h4>
              <p className="text-cod-gray-cg-600 text-SP-03 font-semibold">
                Please, enter your correct details
              </p>

              <div className="w-[500px] flex flex-col gap-5 mt-5">
                <Input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  fullWidth
                />

                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  fullWidth
                />
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold mb-2">
                Delivery Fees: ${deliveryFee.toLocaleString()}
              </h4>
              <h6 className="text-cod-gray-cg-600 text-H6-03 w-[342.32px]">
                Delivery fees are determind by product quantity, weight and your
                location distance.
              </h6>
            </div>
          </div>

          <div className="w-[564px] rounded bg-light-green-shade py-6 px-8 mt-20">
            <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold mb-5">
              Card Details
            </h4>

            <div className="flex flex-col gap-8">
              <Input
                type="text"
                name="cardName"
                placeholder="Name on Card"
                fullWidth
              />

              <Input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                fullWidth
              />

              <div className="flex gap-6">
                <Input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date"
                  fullWidth
                />

                <Input type="text" name="cvv" placeholder="CVV" fullWidth />
              </div>
            </div>
            <div className=" mt-24">
              <Button size="lg" fullWidth>
                Pay Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Checkout;
