import { cn } from "@/utils";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import * as React from "react";
import { useRef } from "react";

type IconContainerProps = {
  /**
   * Whether to apply fill colors to SVG paths (true) or use text color (false).
   * @default true
   */
  colorInFill?: boolean;
  /**
   * Whether to disable the theme.
   * @default false
   */
  disableTheme?: boolean;
  /**
   * The type of icon to display.
   * - `animated`: Displays an animated Lottie animation.
   * - `static`: Displays a static icon.
   * @default "static"
   */
  type?: "animated" | "static";
  /**
   * The size of the icon.
   * @default "sm"
   */
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "auto";
} & React.HTMLAttributes<HTMLDivElement>;

type AnimatedIconProps = IconContainerProps & {
  type: "animated";
  isLoading?: boolean;
  animationData: unknown;
};

type StaticIconProps = IconContainerProps & {
  type?: "static";
  children: React.ReactNode;
};

export type IconProps = AnimatedIconProps | StaticIconProps;

function isAnimatedIconProps(props: IconProps): props is AnimatedIconProps {
  return props.type === "animated";
}

export default function IconContainer({
  colorInFill = true,
  type = "static",
  disableTheme = false,
  size = "sm",
  className,
  ...props
}: IconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const typedProps = { ...props, type } as IconProps;

  const isAnimated = isAnimatedIconProps(typedProps);

  // Get container size based on size prop
  const getContainerSize = (containerSize: IconContainerProps["size"]) => {
    switch (containerSize) {
      case "auto":
        return "";
      case "xs":
        return "h-[18px] w-[18px]";
      case "sm":
        return "h-5 w-5";
      case "md":
        return "w-6 h-6";
      case "lg":
        return "h-7 w-7";
      case "xl":
        return "h-8 w-8";
      case "2xl":
        return "h-9 w-9";
      case "3xl":
        return "h-11 w-11";
      case "4xl":
        return "h-14 w-14";
      case "5xl":
        return "h-[68px] w-[68px]";
      case "6xl":
        return "h-20 w-20";
      default:
        return "h-[18px] w-[18px]";
    }
  };

  const handleMouseEnter = () => {
    lottieRef.current?.setDirection(1);
    lottieRef.current?.play();
  };
  const handleMouseLeave = () => {
    if (isAnimated && !typedProps.isLoading) {
      lottieRef.current?.setDirection(-1);
      lottieRef.current?.play();
    }
  };

  return (
    <div
      onMouseEnter={isAnimated ? handleMouseEnter : undefined}
      onMouseLeave={isAnimated ? handleMouseLeave : undefined}
      className={cn(
        "flex shrink-0 items-center justify-center",
        getContainerSize(size),
        {
          /* Styles for svg paths */
          "[&_path]:fill-element-inverse-default dark:[&_path]:fill-element-inverse-defaul-alt":
            !disableTheme && colorInFill,

          /* Styles for svg element */
          "text-element-inverse-default": !disableTheme && !colorInFill,

          /* Exception for button ai-outline variant */
          "group-hover:group-data-[variant='ai-outline']:[&_path]:fill-element-inverse-default-alt! dark:group-hover:group-data-[variant='ai-outline']:[&_path]:fill-element-inverse-default!":
            !disableTheme,
        },
        className,
      )}
      {...props}
    >
      {!isAnimated && (
        <>
          {React.Children.map(typedProps.children, (child) => {
            if (React.isValidElement(child)) {
              const childElement = child as React.ReactElement<any>;
              return React.cloneElement(childElement, {
                className: cn(
                  "h-full w-full",
                  childElement.props?.className || "",
                ),
                strokeWidth: 0.4,
              });
            }
            return child;
          })}
        </>
      )}
      {isAnimated && (
        <Lottie
          lottieRef={lottieRef}
          animationData={typedProps.animationData}
          loop={typedProps.isLoading}
          autoplay={typedProps.isLoading}
        />
      )}
    </div>
  );
}
