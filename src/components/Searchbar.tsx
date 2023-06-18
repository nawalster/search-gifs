"use client";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRoute = () => {
    router.push(`/search/${searchTerm}`);
  };

  return (
    <div className="flex relative rounded-md w-full px-4">
      <input
        type="text"
        placeholder="Search GIFS"
        className="w-full px-5 py-6 text-black rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none "
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        className="inline-flex items-center gap-2 bg-indigo-500 text-white text-lg font-semibold py-3 px-6 rounded-r-md"
        onClick={handleRoute}
      >
        <span className="block">
          <svg
            className="text-gray-200 h-5 w-5 p-0 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            width="100%"
            height="100%"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Searchbar;
