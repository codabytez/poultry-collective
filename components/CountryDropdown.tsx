"use client";
import { NextPage } from "next";
import { Country, DropdownProps } from "@/@types";
import Image from "next/image";
import { useState } from "react";

const CountryDropdown: NextPage<DropdownProps> = ({ countries, fullWidth }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find(
      (country) => country.name === event.target.value
    );
    setSelectedCountry(selected || null);
  };

  return (
    <div
      className={`flex items-center gap-3  select-wrapper px-3 ${
        fullWidth ? "w-full bg-light-green-shade" : "w-max"
      }`}
    >
      {selectedCountry && (
        <Image
          src={selectedCountry.flag}
          alt={selectedCountry.name}
          width={22}
          height={16}
          className="w-[25px] h-full"
        />
      )}
      <select
        className={`bg-light-green-shade  py-3 cursor-pointer focus:outline-none ${
          fullWidth ? "w-full" : "w-[20px]"
        }`}
        onChange={handleSelect}
      >
        <option>{fullWidth ? "Select country" : " "}</option>
        {countries.map((country, index) => (
          <option key={index} value={country.name}>
            {fullWidth ? country.name : ""}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
