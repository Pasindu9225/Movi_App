import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange: React.ChangeEvent<HTMLInputElement> | undefined;
};

function Searchbar({ value, onChange }: Props) {
  return (
    <div className=" rounded border-2  border-green-800 flex gap-2 px-2 py-1 sm:w-[60px] md:w-fit">
      <IoIosSearch className=" text-3xl text-green-500" />

      <input
        value={value}
        onChange={onChange}
        className=" outline-none w-[350px] bg-inherit max-w-[350px]"
        type="text"
      />
    </div>
  );
}

export default Searchbar;
