"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import { useState, useEffect } from "react";
import Loader from "@/components/UI/Loader";

function withRoleCheck(WrappedComponent: NextPage, allowedRoles: string[]) {
  return function RoleCheck(props: any) {
    const router = useRouter();
    const { user } = useUser();
    const [userRole, setUserRole] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      if (user) {
        (async () => {
          try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const userProfile = await useGetProfileByUserId(user.id);
            if (userProfile) {
              setUserRole(userProfile.role);
            }
          } catch (error) {
            console.log("error", error);
          } finally {
            setIsLoading(false);
          }
        })();
      }
    }, [user]);

    if (isLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <Loader />;
        </div>
      );
    }

    if (userRole && !allowedRoles.includes(userRole)) {
      // If the user's role is not in the list of allowed roles, redirect them to the home page
      router.push("/");
      return null;
    }

    // If the user's role is allowed, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}

export default withRoleCheck;
