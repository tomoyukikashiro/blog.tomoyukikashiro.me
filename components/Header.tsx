import { VFC } from "react";
import Link from "next/link";

export const Header: VFC = () => (
  <header className="py-8">
    <div className="container mx-auto">
      <nav>
        <div className="flex justify-center items-center">
          <Link href="/">
            <a className="flex justify-center items-center">
              <img src="/logo-zeus-red.svg" alt="" width="auto" />
              <h1 className="text-md font-normal">Tomoyuki Kashiro's Blog</h1>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  </header>
);
