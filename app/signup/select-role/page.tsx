import { NextPage } from "next";
// import { useUser } from "@/context/user";
// import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";

const SelectRolePage: NextPage = () => {
  //   const { user, updateUserRole } = useUser();
  //   const router = useRouter();

  //   const handleRoleSelect = async (role: string) => {
  //     if (!user) return console.log("No user context");

  //     try {
  //       await updateUserRole(role);
  //       router.push(`/${role}`);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  return (
    <div className="w-[683px] h-[592px] shrink-0 bg-white shadow-xl m-auto flex flex-col justify-center items-center gap-8">
      <h3 className="text-center text-cod-gray-cg text-H3-03 font-normal w-[511px]">
        Now that you’re here, do you want to buy or sell?
      </h3>

      <div className="flex flex-col w-[304px] items-center gap-16 justify-center">
        <Button
          color="green"
          size="large"
          //   onClick={() => handleRoleSelect("buyer")}
          fullWidth
        >
          Buy
        </Button>
        <Button
          color="white"
          size="large"
          //   onClick={() => handleRoleSelect("seller")}
          fullWidth
        >
          Sell
        </Button>
      </div>
    </div>
  );
};

export default SelectRolePage;
