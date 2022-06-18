import { VFC } from "react";
import Link from "next/link";

export const Profile: VFC = () => (
  <section className="relative py-20">
    <div className="container px-4 mx-auto">
      <div className="flex items-center justify-around">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
              <h2 className="mb-4 text-4xl font-semibold font-heading">
                Esther Howard
              </h2>
              <p className="mb-10 font-heading">CEO &amp; Founder</p>
              <p className="mb-10 text-xl text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan
                aliquet orci.
              </p>
              <div>
                <Link href="#">
                  <a className="inline-flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-gray-50">
                    <svg
                      width="13"
                      height="11"
                      viewBox="0 0 13 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5454 2.09731C12.0904 2.29895 11.6021 2.43569 11.0891 2.49674C11.6129 2.18307 12.0139 1.68553 12.2039 1.0945C11.7126 1.38499 11.1702 1.59592 10.5923 1.71026C10.1296 1.21658 9.47132 0.909088 8.74122 0.909088C7.34053 0.909088 6.20483 2.04479 6.20483 3.4447C6.20483 3.64325 6.22724 3.83717 6.27051 4.0226C4.16291 3.91675 2.29405 2.90699 1.04324 1.37262C0.824591 1.74656 0.700208 2.18228 0.700208 2.64739C0.700208 3.52737 1.14831 4.30382 1.82819 4.75808C1.41253 4.74418 1.0216 4.62984 0.679359 4.43978V4.47145C0.679359 5.69986 1.55392 6.72507 2.71356 6.9584C2.5011 7.01557 2.27706 7.04725 2.04528 7.04725C1.8815 7.04725 1.72312 7.03103 1.56782 7.00012C1.89075 8.00834 2.82714 8.74151 3.93657 8.76161C3.06895 9.44149 1.97498 9.84555 0.786753 9.84555C0.582026 9.84555 0.380369 9.83319 0.181824 9.81079C1.30439 10.5316 2.6371 10.9519 4.06946 10.9519C8.73508 10.9519 11.2854 7.08743 11.2854 3.73598L11.2769 3.40763C11.7752 3.05222 12.2063 2.60567 12.5454 2.09731Z"
                        fill="#758A99"
                      ></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className="relative w-full h-96 lg:w-1/3 px-4">
              <img
                className="w-full h-inherit object-cover object-top rounded-xl"
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
