"use client";
import { MouseEvent } from "react";
import { NextPage } from "next";
import { ModalProps } from "@/@types";
import { useGeneralStore } from "@/stores/general";

const Modal: NextPage<ModalProps> = ({ children }) => {
  const { isModalOpen, setIsModalOpen } = useGeneralStore();

  if (!isModalOpen) {
    return null;
  }

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-x-0 top-[100px] flex justify-center pt-10 z-50 overflow-y-scroll w-screen"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="modal-content bg-white p-4 rounded shadow-lg relative"
        onClick={stopPropagation}
      >
        {children}
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 px-4 py-2 text-white rounded absolute -top-2 right-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
          >
            <path
              d="M19.9987 37.1673C29.1654 37.1673 36.6654 29.6673 36.6654 20.5007C36.6654 11.334 29.1654 3.83398 19.9987 3.83398C10.832 3.83398 3.33203 11.334 3.33203 20.5007C3.33203 29.6673 10.832 37.1673 19.9987 37.1673Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.2852 25.2165L24.7185 15.7832"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.7185 25.2165L15.2852 15.7832"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
