import Searchbar from "@/components/Searchbar";
import NavButton from "@/components/NavButton";
import Link from "next/link";
import GifsContainer from "@/components/GifsContainer";
import { Suspense } from "react";
import Loading from "@/components/Loader";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  // const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 bg-black pb-4">
        <div className="flex flex-row justify-between py-6 px-4">
          <h1 className="joyride flex flex-col text-left font-mono text-6xl font-bold flex-grow">
            {params.slug}
          </h1>
          <div>
            <Link href="/favourites">
              <NavButton label="favourites" />
            </Link>
          </div>
        </div>
        <Searchbar />
      </div>
      <GifsContainer query={params.slug} />
    </main>
  );
}
