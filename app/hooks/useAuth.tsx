"use client";
import { useState, useEffect, useMemo } from "react";
import { account, ID } from "@/config/appwrite";
import { Client, Account } from "appwrite";
import { Auth, User } from "@/@types";
import { useRouter } from "next/navigation";

export const config: {
  APPWRITE_ENDPOINT: string | undefined;
  APPWRITE_PROJECT: string | undefined;
} = {
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
};

export const useAuth = (): Auth => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  if (!config.APPWRITE_ENDPOINT || !config.APPWRITE_PROJECT) {
    throw new Error("Appwrite endpoint and project ID must be defined");
  }

  const client = new Client()
    .setEndpoint(config.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(config.APPWRITE_PROJECT); // Your project ID

  const account = useMemo(() => new Account(client), [client]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    if (userId && secret) {
      account.updateVerification(userId, secret).then((response: any) => {
        console.log(response);
        window.location.href = "/";
      }, console.error);
    }
  }, [account]);

  const login = async (email: string, password: string) => {
    const session = await account.createEmailSession(email, password);
    setLoggedInUser(await account.get());
  };

  const register = async () => {
    // create a new account
    await account.create(ID.unique(), email, password, name);
    // log the user in
    login(email, password);
    router.push("/verify");
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  const signInWithGoogle = () => {
    account.createOAuth2Session(
      "google",
      "http://localhost:3000", // Success URL
      "http://localhost:3000" // Failure URL
    );
  };

  return {
    loggedInUser,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    login,
    register,
    logout,
    signInWithGoogle,
    confirmPassword,
    setConfirmPassword,
    account,
  };
};
