import { VFC } from "react";

export const TagHeader: VFC<{ tag: string }> = ({ tag }) => (
  <div className="max-w-3xl mb-20 mx-auto text-center">
    <img
      className="hidden lg:block absolute top-0 left-0 mt-20"
      src="/blue-dot-left-bars.svg"
      alt=""
    />
    <img
      className="hidden lg:block absolute top-0 right-0 mt-52"
      src="/yellow-dot-right-shield.svg"
      alt=""
    />
    <span className="text-xs text-blue-400 font-semibold">Tagged By</span>
    <h2 className="mt-8 mb-10 text-4xl font-semibold font-heading">{tag}</h2>
  </div>
);
