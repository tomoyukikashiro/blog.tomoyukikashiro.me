import { FC } from "react";
import { loadDefaultJapaneseParser } from "budoux";
const parser = loadDefaultJapaneseParser();

const Budoux: FC = ({ children }) => {
  const parsed = parser.translateHTMLString(children as string);
  return <span dangerouslySetInnerHTML={{ __html: parsed }} />;
};

export default Budoux;
