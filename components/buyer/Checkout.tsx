"use client";
import { NextPage } from "next";
import CheckoutProduct from "./CheckoutProduct";
import MainLayout from "@/layouts/MainLayout";
import { countries } from "../countries";
import Feedback from "./Feedback";
import Button from "../UI/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/context/user";
import { useCartStore } from "@/stores/cart";
import { Input, SelectInput } from "../UI/Input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import creditCardType from "credit-card-type";
import {
  AmericanExpressIcon,
  DefaultIcon,
  JCBIcon,
  MaestroIcon,
  MasterCardIcon,
  UnionPayIcon,
  VerveIcon,
  VisaIcon,
} from "./cardTypeSvg";
import withRoleCheck from "@/helpers/withRoleCheck";

creditCardType.addCard({
  niceType: "Verve",
  type: "verve",
  patterns: [
    50609960, 50609961, 50609962, 50609963, 50609964, 50609965, 50609966,
    50609967, 50609968, 50609969, 650002, 650003, 650004, 650005, 650006,
    650007, 650008, 650009, 650010, 650011, 650012, 650013, 650014, 650015,
    650016, 650017, 650018, 650019, 650020, 650021, 650022, 650023, 650024,
    650025, 650026, 650027, 650028, 650029, 650030, 650031, 650032, 650033,
    650034, 650035, 650036, 650037, 650038, 650039, 650040, 650041, 650042,
    650043, 650044, 650045, 650046, 650047, 650048, 650049, 650050, 650051,
    650052, 650053, 650054, 650055, 650056, 650057, 650058, 650059, 650060,
    650061, 650062, 650063, 650064, 650065, 650066, 650067, 650068, 650069,
    650070, 650071, 650072, 650073, 650074, 650075, 650076, 650077, 650078,
    650079,
  ],
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: "CVV",
    size: 3,
  },
});

creditCardType.changeOrder("verve", 0);

const Checkout: NextPage = () => {
  const contextUser = useUser();
  const { cart, deleteAllCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const checkoutSchema = z.object({
    city: z.string().min(2, { message: "City is required" }),
    address: z.string().min(2, { message: "Address is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    email: z.string().email({ message: "Email is required" }),
    phone: z.string().min(2, { message: "Phone is required" }),
    cardName: z.string().min(2, { message: "Card name is required" }),
    cardNumber: z
      .string()
      .min(16, { message: "Card number is required" })
      .refine((value) => {
        const cardType = creditCardType(value);
        return (
          cardType[0] &&
          [
            "visa",
            "mastercard",
            "verve",
            "maestro",
            "jcb",
            "american-express",
            "unionpay",
          ].includes(cardType[0].type)
        );
      }, "Card type is not valid"),
    expiryDate: z
      .string()
      .min(4, "Expiry date must be at least 4 characters long"),
    cvv: z
      .string()
      .min(2, { message: "CVV is required" })
      .length(3, "CVV must be 3 digits"),
  });

  const {
    register: registerCheckout,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const random = Math.round(Math.random());
    console.log(random);
    if (random === 0) {
      setFeedback(false);
      setIsLoading(false);
      return setIsOpen(true);
    } else {
      setFeedback(true);
      setIsOpen(true);
      if (!contextUser.user) return;

      try {
        await deleteAllCart(contextUser?.user?.id);
        setIsOpen(true);
        reset();
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

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
          <h3 className="text-H3-03 font-semibold text-center mb-4">
            You are not logged in
          </h3>
          <p className="text-SP-03 text-center mb-8">
            Please, login to continue
          </p>
          <Button size="lg" href="/login">
            Login
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <h3 className="text-H3-03 font-semibold text-center mb-4">
            Your cart is empty
          </h3>
          <p className="text-SP-03 text-center mb-8">
            Please, add some products to your cart
          </p>
          <Button size="lg" href="/buyer">
            Go to Shop
          </Button>
        </div>
      ) : (
        <>
          <form
            className="mb-16 flex gap-24"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <section className="w-[652px] shrink-0 flex flex-col gap-6 ">
              {cart.map((product) => (
                <CheckoutProduct key={product.$id} {...product} />
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
                    <SelectInput
                      optionPlaceholder="Country"
                      options={[
                        { value: "Nigeria", label: "Nigeria" },
                        { value: "Ghana", label: "Ghana" },
                      ]}
                      optionColor="text-[#6C757D]"
                      fullWidth
                      placeholder="Country"
                      register={registerCheckout}
                      name="country"
                      error={errors.country}
                      disabled={isLoading}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setValue("country", e.target.value);
                        clearErrors("country");
                      }}
                    />

                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      fullWidth
                      register={registerCheckout}
                      error={errors.city}
                      disabled={isLoading}
                    />

                    <Input
                      type="text"
                      name="address"
                      placeholder="Address"
                      inputType="textarea"
                      fullWidth
                      register={registerCheckout}
                      error={errors.address}
                      disabled={isLoading}
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
                      register={registerCheckout}
                      error={errors.email}
                      disabled={isLoading}
                    />

                    <Input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      fullWidth
                      register={registerCheckout}
                      error={errors.phone}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold mb-2">
                    Delivery Fees: ${deliveryFee.toLocaleString()}
                  </h4>
                  <h6 className="text-cod-gray-cg-600 text-H6-03 w-[342.32px]">
                    Delivery fees are determind by product quantity, weight and
                    your location distance.
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
                    register={registerCheckout}
                    error={errors.cardName}
                    disabled={isLoading}
                  />

                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    fullWidth
                    register={registerCheckout}
                    leftIcon={
                      cardType === "visa" ? (
                        <VisaIcon />
                      ) : cardType === "mastercard" ? (
                        <MasterCardIcon />
                      ) : cardType === "verve" ? (
                        <VerveIcon />
                      ) : cardType === "jcb" ? (
                        <JCBIcon />
                      ) : cardType === "american-express" ? (
                        <AmericanExpressIcon />
                      ) : cardType === "unionpay" ? (
                        <UnionPayIcon />
                      ) : cardType === "maestro" ? (
                        <MaestroIcon />
                      ) : (
                        <DefaultIcon />
                      )
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      let value = e.target.value.replace(/\s/g, "");
                      if (isNaN(Number(value)) || value.length > 16) {
                        return;
                      }

                      if (value.length >= 4) {
                        const cardType = creditCardType(value);
                        if (cardType[0]) {
                          setCardType(cardType[0].type);
                        }
                        value = value
                          .replace(/\W/gi, "")
                          .replace(/(.{4})/g, "$1 ");
                      } else {
                        setCardType("");
                      }
                      setCardNumber(value.trim());
                      clearErrors("cardNumber");
                    }}
                    value={cardNumber}
                    error={errors.cardNumber}
                    disabled={isLoading}
                  />

                  <div className="flex gap-6">
                    <Input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      fullWidth
                      register={registerCheckout}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value;
                        const [month, year] = value.split("/");
                        if (
                          isNaN(Number(value.replace("/", ""))) ||
                          month.length > 2 ||
                          (year && year.length > 2)
                        ) {
                          return;
                        }
                        if (value.length === 2 && !value.includes("/")) {
                          value += "/";
                        }
                        if (year && year.length === 2) {
                          const expiryDate = new Date(
                            parseInt("20" + year),
                            parseInt(month) - 1
                          );
                          if (expiryDate < new Date()) {
                            return;
                          }
                        }
                        setExpiryDate(value);
                        clearErrors("expiryDate");
                      }}
                      value={expiryDate}
                      error={errors.expiryDate}
                      disabled={isLoading}
                    />

                    <Input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      fullWidth
                      register={registerCheckout}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value;
                        if (isNaN(Number(value)) || value.length > 3) {
                          return;
                        }
                        setCvv(value);
                        clearErrors("cvv");
                      }}
                      value={cvv}
                      error={errors.cvv}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className=" mt-24">
                  <Button size="lg" type="submit" fullWidth>
                    Pay Now
                  </Button>
                </div>
              </div>
            </section>
          </form>
        </>
      )}
      <Feedback isOpen={isOpen} setIsOpen={setIsOpen} feedback={feedback} />
    </MainLayout>
  );
};

export default withRoleCheck(Checkout, ["buyer"]);
