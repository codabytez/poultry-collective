import Image from "next/image";
import React, { useEffect, useState } from "react";
import successFeedback from "@/public/assets/success.gif";
import errorFeedback from "@/public/assets/failed.gif";
import Button from "../UI/Button";
import { notify } from "../UI/Toast";
import Loader from "../UI/Loader";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";

const Feedback: React.FC<{
  feedback: boolean | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ feedback, isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const handleClick = () => {
    nProgress.start();
    if (feedback) {
      router.push("/buyer");
      setTimeout(() => {
        setIsOpen(false);
        nProgress.done();
      }, 2000);
    } else {
      setTimeout(() => {
        setIsOpen(false);
        nProgress.done();
      }, 2000);
    }
  };


  return (
    <>{
      isOpen ?
        <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50 overflow-hidden">
          {isLoading ? <Loader /> :
            <div className="w-[638px] shadow-[0px_4px_4px_rgba(0_0_0_0.25)] h-[612px] rounded-xl bg-white flex flex-col gap-10 justify-center items-center">
              <h4 className="text-H3-03 text-cod-gray-cg-600 font-semibold">
                {feedback
                  ? "Your order was successful "
                  : "Your order was unsuccessful "}
              </h4>
              <div className='w-[180px] h-[180px] flex justify-center items-center relative'>
                <Image
                  src={feedback ? successFeedback : errorFeedback}
                  alt={feedback ? "success" : "error"}
                  width={feedback ? 363 : 180}
                  height={feedback ? 363 : 180}
                  className="object-contain absolute "
                />
              </div>
              <div className="flex flex-col items-center gap-10 w-[300px]">
                <Button size="lg" fullWidth onClick={handleClick}>
                  {feedback ? "Continue Shopping" : "Return to Checkout"}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  fullWidth
                  onClick={() =>
                    notify({
                      message: "This feature is not yet available",
                      theme: "colored",
                      type: "info",
                    })
                  }
                >
                  {feedback ? "Save Receipt" : "Contact Support"}
                </Button>
              </div>
            </div>}
        </div> : null
    }</>

  );
};

export default Feedback;
