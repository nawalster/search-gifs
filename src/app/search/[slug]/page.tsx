import Link from "next/link";

import Searchbar from "@/components/Searchbar";
import NavButton from "@/components/NavButton";
import GifsContainer from "@/components/GifsContainer";
interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="fixed w-full top-0 z-50 bg-black pb-4">
        <div className="flex flex-row justify-between py-6 px-4">
          <h1 className="joyride flex flex-col text-left font-mono text-6xl font-bold flex-grow">
            {decodeURI(params.slug)}
          </h1>
          <div>
            <Link href="/favourites">
              <NavButton label="favourites" />
            </Link>
          </div>
        </div>
        <Searchbar />
      </div>
      <div className="pt-48 sm:pt-48">
        <GifsContainer query={params.slug} />
      </div>
    </main>
  );
}
