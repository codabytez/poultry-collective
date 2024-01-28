import { NextPage } from "next";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import { ChangeEvent, useState } from "react";
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
import creditCardType from "credit-card-type";
import { PaystackButton } from "react-paystack";
import { closePaymentModal } from "flutterwave-react-v3";

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

type CheckOutCardDetailsProps = {
  registerCheckout: any;
  errors: any;
  clearErrors: any;
  isLoading: boolean;
};

const CheckOutCardDetails: NextPage<CheckOutCardDetailsProps> = ({
  registerCheckout,
  errors,
  clearErrors,
  isLoading,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="w-full sm:w-[564px] lg:w-full xl:w-[564px] rounded bg-light-green-shade py-6 px-8 mt-20">
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
              value = value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
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

        <div className="flex gap-6 flex-col sm:flex-row">
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
        <Button size="lg" fullWidth disabled={isLoading} isLoading={isLoading}>
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default CheckOutCardDetails;
