import Link from "next/link";
import { Suspense } from "react";

import Searchbar from "@/components/Searchbar";
import NavButton from "@/components/NavButton";
import FavouritesContainer from "@/components/FavouritesContainer";

const page = async () => {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="fixed w-full top-0 z-50 bg-black pb-4">
        <div className="flex flex-col sm:flex-row justify-between py-6 px-4">
          <h1 className="joyride flex flex-col text-left font-mono text-6xl font-bold flex-grow uppercase">
            favourites
          </h1>
          <div className="sm:ml-auto mt-4 sm:mt-0">
            <Link href="/">
              <NavButton label="trending" />
            </Link>
          </div>
        </div>
        <Searchbar />
      </div>
      <div className="sm:pt-48">
        <FavouritesContainer />
      </div>
    </main>
  );
};

export default page;
