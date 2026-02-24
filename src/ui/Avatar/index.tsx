import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/utils";
import { cva } from "class-variance-authority";
import { Tooltip, type PositionProps } from "@/ui/Tooltip";

// Types
type StatusSize = "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";
type Status = "active" | "inactive";

// Constants
const STATUS_SIZE = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
} as const;

const AVATAR_SIZE_MAPPER = {
  xs: {
    className: "size-5 !text-caption !font-semibold",
    statusSize: STATUS_SIZE.sm,
  },
  sm: {
    className: "size-6 !text-caption !font-semibold",
    statusSize: STATUS_SIZE.sm,
  },
  md: {
    className: "size-7 !text-caption !font-semibold",
    statusSize: STATUS_SIZE.sm,
  },
  lg: {
    className: "size-8 !text-title-sm !font-bold",
    statusSize: STATUS_SIZE.md,
  },
  xl: {
    className: "size-9 !text-title-sm !font-bold",
    statusSize: STATUS_SIZE.md,
  },
  "2xl": {
    className: "size-10 !text-title-lg !font-bold",
    statusSize: STATUS_SIZE.md,
  },
  "3xl": {
    className: "size-16 !text-h5 !font-bold",
    statusSize: STATUS_SIZE.lg,
  },
  "4xl": {
    className: "size-20 !text-h3 !font-bold",
    statusSize: STATUS_SIZE.xl,
  },
  "5xl": {
    className: "size-28 !text-h2 !font-bold",
    statusSize: STATUS_SIZE["2xl"],
  },
} as const;

// Styles
const statusVariants = cva(
  "bg-fill-static-green-03 absolute right-0 bottom-0 rounded-unit-corner-radius-rounded-full border-unit-border-width-sm !border-stroke-inverse-slate-01",
  {
    variants: {
      size: {
        sm: "size-2 border-unit-border-width-sm",
        md: "size-[10px] border-unit-border-width-sm",
        lg: "size-[18px] border-unit-border-width-md",
        xl: "size-6 border-unit-border-width-md",
        "2xl": "size-8 border-unit-border-width-lg",
      },
      status: {
        active: "bg-fill-static-green-03",
        inactive: "bg-fill-static-slate-03",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

// Interfaces
interface BaseAvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  fallback: string;
  fallbackClassName?: string;
  status?: Status;
  size?: AvatarSize;
  tooltip?: React.ReactNode;
  tooltipPosition?: PositionProps;
}

interface ImageAvatarProps extends BaseAvatarProps {
  variant: "image";
  imgsrc: string;
}

interface TextAvatarProps extends BaseAvatarProps {
  variant: "text";
}

interface EmptyAvatarProps extends BaseAvatarProps {
  variant: "placeholder";
}

export type AvatarProps = ImageAvatarProps | TextAvatarProps | EmptyAvatarProps;

// Avatar Content Components
const ImageAvatarContent: React.FC<{
  imgsrc: string;
  fallback: string;
  sizeConfig: (typeof AVATAR_SIZE_MAPPER)[keyof typeof AVATAR_SIZE_MAPPER];
  fallbackClassName?: string;
}> = ({ imgsrc, fallback, sizeConfig, fallbackClassName }) => (
  <>
    <BaseAvatarImage src={imgsrc} />
    <BaseAvatarFallback
      className={cn(
        sizeConfig.className,
        "bg-primary-bg-normal",
        fallbackClassName,
      )}
    >
      {fallback}
    </BaseAvatarFallback>
  </>
);

const EmptyAvatarContent: React.FC<{
  fallback: string;
  sizeConfig: (typeof AVATAR_SIZE_MAPPER)[keyof typeof AVATAR_SIZE_MAPPER];
  fallbackClassName?: string;
}> = ({ fallback, sizeConfig, fallbackClassName }) => (
  <>
    <BaseAvatarImage src="" className="bg-fill-inverse-slate-03" />
    <BaseAvatarFallback
      className={cn(
        sizeConfig.className,
        "bg-primary-bg-normal",
        fallbackClassName,
      )}
    >
      {fallback}
    </BaseAvatarFallback>
  </>
);

// const IconAvatarContent: React.FC<{
//   icon: React.ReactNode;
// }> = ({ icon }) => <>{icon}</>;

const TextAvatarContent: React.FC<{
  fallback: string;
  sizeConfig: (typeof AVATAR_SIZE_MAPPER)[keyof typeof AVATAR_SIZE_MAPPER];
  fallbackClassName?: string;
}> = ({ fallback, sizeConfig, fallbackClassName }) => (
  <BaseAvatarFallback
    className={cn(
      sizeConfig.className,
      "bg-fill-inverse-slate-03 text-element-inverse-default font-semibold",
      fallbackClassName,
    )}
  >
    {fallback}
  </BaseAvatarFallback>
);

// Main Components
function AvatarStack({
  stackCount = 1,
  size = "md",
  showCount = true,
  isLastOnTop = true,
  stackClassName,
  avatars = [],
}: {
  stackCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  isLastOnTop?: boolean;
  avatars: AvatarProps[];
  stackClassName?: string;
}) {
  const sizeMap = { sm: "xs", md: "sm", lg: "md" } as const;

  return (
    <div className={cn("flex items-center -space-x-2", stackClassName)}>
      {avatars.slice(0, stackCount).map((avatar, index) => (
        <Avatar
          {...avatar}
          key={index}
          size={sizeMap[size]}
          className="outline-stroke-inverse-slate-01 outline-1"
          style={{
            zIndex: isLastOnTop ? index + 1 : stackCount - index,
          }}
        />
      ))}
      {showCount && avatars.length > stackCount && (
        <Avatar
          variant="text"
          fallback={`+${avatars.length - stackCount}`}
          size={sizeMap[size]}
          className="text-element-inverse-default text-caption leading-caption bg-fill-inverse-slate-03 border-stroke-inverse-slate-01 outline-stroke-inverse-slate-01 border font-semibold outline-1"
          fallbackClassName="text-caption"
          style={{
            zIndex: isLastOnTop ? avatars.length + 1 : 0,
          }}
        />
      )}
    </div>
  );
}

function Avatar({
  variant,
  fallback,
  status,
  size = "sm",
  className,
  fallbackClassName,
  tooltip,
  tooltipPosition = "top",
  ...props
}: AvatarProps) {
  const sizeConfig = AVATAR_SIZE_MAPPER[size];

  const renderAvatarContent = () => {
    switch (variant) {
      case "image":
        return (
          <ImageAvatarContent
            imgsrc={(props as ImageAvatarProps).imgsrc}
            fallback={fallback}
            sizeConfig={sizeConfig}
            fallbackClassName={fallbackClassName}
          />
        );
      case "text":
        return (
          <TextAvatarContent
            fallback={fallback}
            sizeConfig={sizeConfig}
            fallbackClassName={fallbackClassName}
          />
        );
      case "placeholder":
        return (
          <EmptyAvatarContent
            fallback={fallback}
            sizeConfig={sizeConfig}
            fallbackClassName={fallbackClassName}
          />
        );
      default:
        return null;
    }
  };

  const avatarElement = (
    <div className="relative w-fit">
      <BaseAvatar
        {...props}
        className={cn(
          sizeConfig.className,
          className,
          "flex items-center justify-center text-center",
          {
            "bg-primary-bg-light": variant === "placeholder",
          },
          "flex items-center justify-center text-center",
        )}
      >
        {renderAvatarContent()}
      </BaseAvatar>
      {!!status && (
        <BaseAvatarStatus status={status} size={sizeConfig.statusSize} />
      )}
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip
        trigger={avatarElement}
        content={tooltip}
        position={tooltipPosition}
      />
    );
  }

  return avatarElement;
}

// Base Components
function BaseAvatarStatus({
  className,
  status,
  size,
  ...props
}: {
  className?: string;
  status: Status;
  size: StatusSize;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(statusVariants({ size, status }), className)}
      {...props}
    />
  );
}

function BaseAvatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function BaseAvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function BaseAvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarStack };
