"use client";
import { NextPage } from "next";
import CheckoutProduct from "./CheckoutProduct";
import MainLayout from "@/layouts/MainLayout";
import Feedback from "./Feedback";
import Button from "../UI/Button";
import { useState } from "react";
import { useUser } from "@/context/user";
import { useCartStore } from "@/stores/cart";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import withRoleCheck from "@/helpers/withRoleCheck";
import CheckOutAddress from "./CheckOutAddress";
import CheckOutOrderSummary from "./CheckOutOrderSummary";
import CheckOutCardDetails from "./CheckOutCardDetails";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Modal from "../UI/Modal";
import { PaystackButton } from "react-paystack";

const Checkout: NextPage = () => {
  const contextUser = useUser();
  const { cart, deleteAllCart } = useCartStore();
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const checkoutSchema = z.object({
    city: z.string().min(2, { message: "City is required" }),
    address: z.string().min(2, { message: "Address is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    email: z.string().email({ message: "Email is required" }),
    phone: z.string().min(2, { message: "Phone is required" }),
    fullName: z.string().min(2, { message: "Full name is required" }),
  });

  const {
    register: registerCheckout,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = () => {
    setIsLoading(true);
    setPaymentMethodModal(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

  const shippingFeePerKg = 100;
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
    const feePerItem = 10;
    const feePerKm = 100;

    return feePerKg * weight + feePerItem * quantity + feePerKm * distance;
  }

  const paystackPublicKey = String(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
  const flutterwavePublicKey = String(
    process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY
  );
  const email = String(watch("email"));
  const amount = Number(subtotal + shippingFee + deliveryFee);

  const componentProps = {
    email,
    amount: amount * 100,
    publicKey: paystackPublicKey,

    text: "Paystack",
    metadata: {
      custom_fields: [
        {
          display_name: "Phone",
          variable_name: "phone-number",
          value: String(watch("phone")),
        },
        {
          display_name: "Full Name",
          variable_name: "name",
          value: String(watch("fullName")),
        },
      ],
    },
    onSuccess: () => {
      if (contextUser.user) {
        deleteAllCart(contextUser.user?.id);
      }
      setIsOpen(true);
      setFeedback(true);
      setPaymentMethodModal(false);
    },
    onClose: () => {
      setIsOpen(true);
      setFeedback(false);
      setPaymentMethodModal(false);
    },
  };

  const config = {
    public_key: flutterwavePublicKey,
    tx_ref: String(Date.now()),
    amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: String(watch("phone")),
      name: String(watch("fullName")),
    },
    customizations: {
      title: "Poultry Collective",
      description: "Payment for items in cart",
      logo: "https://cloud.appwrite.io/v1/storage/buckets/657dc2d1c018301db553/files/65b56bef24ec2095f192/view?project=657d7d40ecfc0df965cc&mode=admin",
    },
  };

  const initializePayment = useFlutterwave(config);

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
          <h3 className="text-H5-03 md:text-H3-03 font-semibold text-center mb-4">
            Your cart is empty
          </h3>
          <p className="text-SC-03 md:text-SP-03 text-center mb-8">
            Please, add some products to your cart
          </p>
          <Button size="lg" href="/buyer">
            Go to Shop
          </Button>
        </div>
      ) : (
        <>
          <form
            className="mb-16 mt-6 flex flex-col px-2 lg:flex-row gap-24 lg:gap-10 xl:gap-20"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <section className="w-full sm:w-[652px] lg:w-max xl-w-full xl:basis-[47%] desktop:basis-auto desktop:w-[652px] shrink-0 order-2 lg:order-1 flex flex-col gap-6">
              {cart.map((product) => (
                <CheckoutProduct key={product.$id} {...product} />
              ))}
            </section>

            <section className="order-1 lg:order-2 lg:px-0 lg:basis-[60%] xl:basis-auto">
              <CheckOutOrderSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
              />
              <CheckOutAddress
                registerCheckout={registerCheckout}
                errors={errors}
                setValue={setValue}
                clearErrors={clearErrors}
                isLoading={isLoading}
                deliveryFee={deliveryFee}
              />

              <CheckOutCardDetails
                registerCheckout={registerCheckout}
                errors={errors}
                clearErrors={clearErrors}
                isLoading={isLoading}
              />
              <div className=" mt-8 w-full sm:w-[564px] lg:w-full xl:w-[564px]">
                <Button
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Pay Now
                </Button>
              </div>
            </section>
          </form>
        </>
      )}
      <Modal
        isModalOpen={paymentMethodModal}
        setIsModalOpen={setPaymentMethodModal}
      >
        <div className="flex flex-col items-center justify-center h-[400px]">
          <h3 className="text-H5-03 md:text-H3-03 font-semibold text-center mb-4">
            Choose a payment method
          </h3>
          <p className="text-SC-03 md:text-SP-03 text-center mb-8">
            Please, choose a payment method to continue
          </p>
          <div className="flex gap-8 mb-8">
            <PaystackButton
              className="text-white border-2 w-full bg-main-green-mg hover:bg-[#009E60] active:bg-main-green-mg-200 active:text-cod-gray-cg-500 disabled:bg-cod-gray-cg-300 disabled:text-cod-gray-cg-400  py-4 px-8 transition-all duration-200"
              {...componentProps}
            />

            <Button
              size="lg"
              variant="secondary"
              fullWidth
              onClick={() => {
                initializePayment({
                  callback: (response: any) => {
                    console.log(response);
                    console.log(
                      "This is the response status: ",
                      response.status
                    );
                    setPaymentMethodModal(false);
                    closePaymentModal(); // this will close the modal programmatically
                    if (response.status === "completed") {
                      if (contextUser.user) {
                        deleteAllCart(contextUser.user?.id);
                      }
                      setIsOpen(true);
                      setFeedback(true);
                    }
                  },
                  onClose: () => {
                    setPaymentMethodModal(false);
                    setIsOpen(true);
                    setFeedback(false);
                  },
                });
              }}
            >
              Flutterwave
            </Button>
          </div>
        </div>
      </Modal>
      <Feedback isOpen={isOpen} setIsOpen={setIsOpen} feedback={feedback} />
    </MainLayout>
  );
};

export default withRoleCheck(Checkout, ["buyer"]);
