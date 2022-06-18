import { VFC } from "react";
import Link from "next/link";

export const Footer: VFC = () => (
  <footer className="py-10 lg:py-20">
    <div className="container mx-auto px-4 mb-12 md:mb-20">
      <div className="max-w-2xl mx-auto text-center">
        <Link href="/">
          <a className="inline-block mb-8 text-gray-900 text-lg font-semibold">
            <img className="h-7" src="/logo-zeus-red.svg" alt="" width="auto" />
          </a>
        </Link>
        <div className="flex justify-center">
          <Link href="https://twitter.com/tomoyukikashiro">
            <a className="flex justify-center items-center w-10 h-10 mr-4 bg-gray-50 rounded-full">
              <svg
                className="text-gray-500"
                width="13"
                height="11"
                viewBox="0 0 13 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5455 2.09728C12.0904 2.29892 11.6022 2.43566 11.0892 2.49671C11.613 2.18304 12.014 1.6855 12.204 1.09447C11.7127 1.38496 11.1703 1.59589 10.5924 1.71023C10.1296 1.21655 9.47138 0.909058 8.74128 0.909058C7.34059 0.909058 6.20489 2.04475 6.20489 3.44467C6.20489 3.64322 6.2273 3.83714 6.27057 4.02257C4.16298 3.91671 2.29411 2.90696 1.0433 1.37259C0.824652 1.74653 0.700269 2.18225 0.700269 2.64736C0.700269 3.52734 1.14837 4.30379 1.82825 4.75805C1.41259 4.74415 1.02166 4.62981 0.67942 4.43975V4.47142C0.67942 5.69983 1.55399 6.72504 2.71362 6.95837C2.50116 7.01554 2.27712 7.04722 2.04534 7.04722C1.88156 7.04722 1.72318 7.031 1.56788 7.00009C1.89081 8.00831 2.8272 8.74148 3.93663 8.76158C3.06902 9.44146 1.97504 9.84552 0.786814 9.84552C0.582087 9.84552 0.38043 9.83316 0.181885 9.81076C1.30445 10.5316 2.63716 10.9519 4.06952 10.9519C8.73514 10.9519 11.2854 7.0874 11.2854 3.73595L11.2769 3.4076C11.7752 3.05219 12.2063 2.60564 12.5455 2.09728Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
    <p className="text-center text-sm text-gray-500 pt-8 px-4 border-t">
      All rights reserved © Tomoyuki Kashiro {new Date().getFullYear()}
    </p>
  </footer>
);
