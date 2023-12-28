import { PaginationProps } from "@/@types";
import React from "react";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  //   for (let i = 1; i <= totalPages; i++) {
  //     if (
  //       i === 1 ||
  //       i === totalPages ||
  //       i === currentPage ||
  //       i === currentPage - 1 ||
  //       i === currentPage + 1 ||
  //       i <= 9
  //     ) {
  //       pageNumbers.push(i);
  //     } else if (i === currentPage - 2 || i === currentPage + 9) {
  //       pageNumbers.push("...");
  //     }
  //   }

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i <= currentPage + 3 && i >= currentPage - 3)
    ) {
      pageNumbers.push(i);
    } else if (i === 2 && currentPage > 5) {
      pageNumbers.push("...");
    } else if (i === totalPages - 1 && currentPage < totalPages - 4) {
      pageNumbers.push("...");
    }
  }

  return (
    <div className="m-auto">
      <div className="flex py-2 px-4 justify-center items-center gap-1 bg-white">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex p-1 justify-center items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="19"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M15.4998 19.9201L8.97984 13.4001C8.20984 12.6301 8.20984 11.3701 8.97984 10.6001L15.4998 4.08008"
              stroke={currentPage === 1 ? "#6C757D" : "#0D5C3D"}
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            className={`inline-flex text-center text-SC-03 ${
              currentPage === 1 ? "text-cod-gray-cg-400" : "text-main-green-mg"
            }`}
          >
            Previous
          </span>
        </button>

        {pageNumbers.map((number, index) => (
          <p
            key={index}
            className={`flex w-8 h-8 p-1 flex-col justify-center items-center text-center gap-1 text-SC-03 ${
              currentPage === number
                ? "text-main-green-mg bg-cod-gray-cg-50"
                : "text-cod-gray-cg-400"
            }`}
          >
            {number === "..." ? (
              <span className="text-SC-03">...</span>
            ) : (
              <button onClick={() => paginate(number)}>{number}</button>
            )}
          </p>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex p-1 justify-center items-center gap-1"
        >
          <span
            className={`inline-flex text-center justify-center items-center text-SC-03 ${
              currentPage === totalPages
                ? "text-cod-gray-cg-400"
                : "text-main-green-mg"
            }`}
          >
            Next
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="19"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M9.41016 19.9201L15.9302 13.4001C16.7002 12.6301 16.7002 11.3701 15.9302 10.6001L9.41016 4.08008"
              stroke={currentPage === totalPages ? "#6C757D" : "#0D5C3D"}
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
