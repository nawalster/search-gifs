import Searchbar from "@/components/Searchbar";
import NavButton from "@/components/ui/NavButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center min-h-screen flex-col w-full">
      <div className="sticky top-0 z-50 bg-black pb-4">
        <div className="flex flex-col sm:flex-row justify-between py-6 px-4">
          <h1 className="joyride flex flex-col text-left font-mono text-6xl font-bold flex-grow uppercase">
            trending
          </h1>
          <div className="sm:ml-auto mt-4 sm:mt-0">
            <Link href="/favourites">
              <NavButton label="favourites" />
            </Link>
          </div>
        </div>
        <Searchbar />
      </div>
    </main>
  );
}
