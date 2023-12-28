"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { account, ID } from "@/config/appwriteConfig";
import { useRouter } from "next/navigation";
import { User, userContextProps } from "@/@types";
import { NextPage } from "next";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import useCreateProfile from "@/hooks/useCreateProfile";

const userContext = createContext<userContextProps | null>(null);

const UserProvider: NextPage<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const checkUser = async () => {
    try {
      setLoading(true);
      let currentSession = null;

      try {
        currentSession = await account.getSession("current");
      } catch (e) {
        console.log("User is not logged in");
      }

      if (!currentSession) return;

      const newUser = (await account.get()) as any;
      const profile = await useGetProfileByUserId(newUser.$id);

      setUser({
        id: newUser?.$id,
        name: newUser?.name,
        email: newUser?.email,
        image: profile?.image,
      });
    } catch (e) {
      throw e;
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      await account.createEmailSession(email, password);

      await useCreateProfile(
        newUser.$id,
        name,
        email,
        String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR)
      );

      await checkUser();

      router.push("/select-role");
    } catch (e) {
      throw e;
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) return;
    try {
      await account.createEmailSession(email, password);
      await checkUser();
      router.push("/");
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.refresh();
    } catch (e) {
      throw e;
    }
  };

  const signInWithGoogle = async () => {
    try {
      account.createOAuth2Session(
        "google",
        "http://localhost:3000/",
        "http://localhost:3000/login"
      );
      await checkUser();
      router.push("/");
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [loading, router, user]);

  return (
    <userContext.Provider
      value={{
        user,
        signInWithGoogle,
        register,
        login,
        logout,
        checkUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(userContext);
  if (context === null) {
    console.log("useUser must be used within a UserProvider");
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
