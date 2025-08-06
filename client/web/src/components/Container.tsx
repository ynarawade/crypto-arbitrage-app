import clsx from "clsx";
import type { ReactNode } from "react";

interface ContainerPorps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerPorps) {
  return (
    <div className={clsx(`max-w-5xl mx-auto px-4 md:py-4`, { className })}>
      {children}
    </div>
  );
}

export default Container;
