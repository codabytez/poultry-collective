import { NextPage } from "next";
import { Input, SelectInput } from "../UI/Input";
import { ChangeEvent } from "react";

type CheckOutAddressProps = {
  registerCheckout: any;
  errors: any;
  setValue: any;
  clearErrors: any;
  isLoading: boolean;
  deliveryFee: number;
};

const CheckOutAddress: NextPage<CheckOutAddressProps> = ({
  registerCheckout,
  errors,
  setValue,
  clearErrors,
  isLoading,
  deliveryFee,
}) => {
  return (
    <div className="flex flex-col bg-light-green-shade py-6 px-8 mt-20 w-full sm:w-[564px] lg:w-full xl:w-[564px]">
      <div className="">
        <h4 className="text-cod-gray-cg-600 text-H4-03 font-semibold mb-2">
          Delivery Address
        </h4>
        <p className="text-cod-gray-cg-600 text-SP-03 font-semibold">
          Please, enter your correct details
        </p>
        <div className="w-full sm:w-[500px] lg:w-full xl:w-[500px] flex flex-col gap-5 mt-5">
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

        <div className="w-full sm:w-[500px] lg:w-full xl:w-[500px] flex flex-col gap-5 mt-5">
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
        <h6 className="text-cod-gray-cg-600 text-H6-03 w-full max-w-[342.32px] ">
          Delivery fees are determind by product quantity, weight and your
          location distance.
        </h6>
      </div>
    </div>
  );
};

export default CheckOutAddress;
