import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/utils";

interface TitleProps extends React.ComponentPropsWithoutRef<"h2"> {
  asChild?: boolean;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h2";

    return (
      <Comp
        ref={ref}
        className={cn(
          "text-title-lg! leading-body-lg! text-element-inverse-default font-bold",
          className
        )}
        {...props}
      />
    );
  }
);

Title.displayName = "Title";

export default Title;
