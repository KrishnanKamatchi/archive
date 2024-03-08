import { Suspense } from "react";
import Buffer from "./Buffer";

const Loadable = (props) => {
  return <Suspense fallback={<Buffer />}>{props.children}</Suspense>;
};

export default Loadable;
