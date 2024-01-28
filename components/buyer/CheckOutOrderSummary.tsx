import { NextPage } from "next";

type CheckOutOrderSummaryProps = {
  subtotal: number;
  shippingFee: number;
};

const CheckOutOrderSummary: NextPage<CheckOutOrderSummaryProps> = ({
  subtotal,
  shippingFee,
}) => {
  return (
    <div className="inline-flex flex-col p-8 sm:pt-8 sm:pr-6 sm:pb-10 sm:pl-8 items-start gap-7 rounded bg-light-green-shade w-full sm:w-[564px] lg:w-full xl:w-[564px]">
      <h4 className="w-[239px] text-cod-gray-cg-600 text-H4-03">
        Order Summary
      </h4>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between md:justify-start">
          <p className="text-cod-gray-cg-600 text-SP-03 font-semibold sm:w-40">
            Subtotal
          </p>
          <p className="text-cod-gray-cg-600 text-SP-03 font-semibold">
            ₦ {subtotal.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between md:justify-start">
          <p className="text-cod-gray-cg-600 text-SP-03 font-semibold sm:w-40">
            Shipping
          </p>
          <p className="text-cod-gray-cg-600 text-SP-03 font-semibold">
            ₦ {shippingFee.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between md:justify-start">
          <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold sm:w-40">
            Total
          </h4>
          <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold">
            ₦ {(subtotal + shippingFee).toLocaleString()}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CheckOutOrderSummary;
