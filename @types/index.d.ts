import React from "react";
import { StaticImageData } from "next/image";
import { Account } from "appwrite";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type userContextProps = {
  user: User | null;
  register: (email: string, password: string, name: string) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => void;
  checkUser: () => Promise<void>;
};

export interface CustomError extends Error {
  type?: string;
}

export type FormContextProps = {
  businessInfo: {
    name: string;
    address: string;
    phoneNumber: string;
    city: string;
  };
  bioAndBanner: {
    bio: string;
    bannerImage: { preview: string; raw: File | null };
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    validId: string;
    validIdImage: { preview: string; raw: File | null };
    // Add other bank details fields
  };
  setBusinessInfo: React.Dispatch<
    React.SetStateAction<typeof initialBusinessInfo>
  >;
  setBioAndBanner: React.Dispatch<
    React.SetStateAction<typeof initialBioAndBanner>
  >;
  setBankDetails: React.Dispatch<
    React.SetStateAction<typeof initialBankDetails>
  >;
};

export type User = {
  // $id: string;
  id: string;
  name: string;
  email: string;
  image: string;
};

export type profileProps = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  image: string;
};

export type sellerProfileProps = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  image: string;
  name: string;
  address: string;
  phoneNumber: string;
  city: string;
  bio: string;
  bannerImage: string;
  bankName: string;
  accountNumber: string;
  validId: string;
  validIdImage: string;
};

export type sellerProfilePageProps = {
  params: { id: string };
};

////////////////////////////////////////////
////////////////////////////////////////////

// Components

export type ProductProps = {
  user_id: string;
  $id: string;
  product_name: string;
  farm_name: string;
  product_price: string;
  quantity_available: string;
  product_image: string;
  product_weight: string;
  product_details: string;
  imageUrl?: string;
  // onAddToCart: (item: ProductProps) => void; // Add this line
};

export type testimonyProps = {
  id: number;
  testimony: string;
  name: string;
  src: StaticImageData;
};

export type testimonialProps = {
  data: testimonyProps[];
};

export type CheckoutProductProps = {
  image: string;
  name: string;
  weight: string;
  quantityAvailable: string;
  price: string;
};

export type Country = {
  name: string;
  flag: string; // URL to the flag image
};

export type DropdownProps = {
  countries: Country[];
  fullWidth: boolean;
};

////////////////////////////////////////////
////////////////////////////////////////////

// UI

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: "white" | "green";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
};

export type InputProps = {
  label?: string;
  register?: any;
  error?: any;
  name?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  fullWidth?: boolean;
  inputType?: "input" | "textarea";
};

export type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

export type ModalProps = {
  children: ReactNode;
};

export interface cartItemProps {
  $id: string;
  product_name: string;
  price: string;
  quantity: string;
  image: string;
  weight: string;
  user_id: string;
  product_details?: string;
  farm_name?: string;
  onDelete: (id: string) => void;
}

export type CartModalProps = {
  items: cartItemProps[];
  onDelete: (id: string) => void;
};

export type StarRatingProps = {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  onSetRating?: (rating: number) => void;
};

export type StarProps = {
  onRate: MouseEventHandler<HTMLSpanElement>;
  full: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
  color: string;
  size: number;
};
///////////////////////
//////////////////////

export interface productDetailTypes {
  params: { productid: string };
}
