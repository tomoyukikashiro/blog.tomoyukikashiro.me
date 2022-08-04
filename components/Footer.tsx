import { VFC } from "react";

export const Footer: VFC = () => (
  <footer className="py-10 lg:py-20">
    <p className="text-center text-sm text-gray-500 pt-8 px-4 border-t">
      All rights reserved © Tomoyuki Kashiro {new Date().getFullYear()}
    </p>
  </footer>
);
