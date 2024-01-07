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
  role?: string;
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
  product_id?: string;
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
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  href?: string;
  spinnerColor?: string;
  spinnerSize?: string | number;
  variant?: "primary" | "secondary" | "link-primary" | "link-secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export type Variant = "primary" | "secondary" | "tertiary" | "default";

export type Size = "sm" | "md" | "lg";

export type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  isLoading?: boolean;
  disabled?: boolean;
  href?: string;
  caretColor?: string;
  caretSize?: string | number;
  leftIcon?: React.ReactNode;
  optionColor?: string;
  variant?: Variant;
  inputSize?: Size;
  fullWidth?: boolean;
  optionPlaceholder?: string;
  error?: string;
  register?: any;
  name?: string;
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
  rows?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  inputSize?: Size;
  variant?: Variant;
  isLoading?: boolean;
  iconColor?: string;
  iconSize?: number;
};

export type ToastProps = {
  message: string;
  position?: ToastPosition;
  autoClose?: number | false;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: number | undefined;
  type?: TypeOptions;
  theme?: Theme;
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

export interface cartProps {
  $id?: string;
  product_name?: string;
  price?: string;
  quantity?: string;
  image?: string;
  weight?: string;
  user_id?: string;
  product_id?: string;
  product_details?: string;
  farm_name?: string;
  product_id?: string;
}

export type cartItemProps = cartProps & {
  fetchProductQuantity?: () => Promise<void>;
};

export type CartModalProps = {
  items: any;
  onDelete?: (id: string) => Promise<void>;
  fetchProductQuantity?: () => Promise<void>;
  $id?: string;
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
