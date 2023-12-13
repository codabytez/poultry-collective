import React from "react";
import { StaticImageData } from "next/image";
import { Account } from "appwrite";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: "white" | "green";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
};

interface InputProps {
  label: string;
  register: any;
  error: any;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
}

export interface testimonyProps {
  id: number;
  testimony: string;
  name: string;
  src: StaticImageData;
}

export interface testimonialProps {
  data: testimonyProps[];
}

interface User {
  $id: string;
  name: string;
  email: string;
  // Add other user properties here
}

interface Auth {
  loggedInUser: User | null;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  name: string;
  setName: (name: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => void;
  account: Account | null;
}

interface config {
  APPWRITE_PROJECT: string | undefined;
  APPWRITE_ENDPOINT: string | undefined;
}
