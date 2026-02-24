import { ChevronRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/Dropdown";
import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface BreadcrumbItemType {
  label: string;
  href?: string;
  onlyIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
}

// Common styles for breadcrumb items
const breadcrumbItemStyles =
  "hover:bg-breadcrumb-bg-hover py-2px px-2px text-caption text-text-light rounded-md font-medium transition-colors duration-75";
const disabledItemStyles =
  "text-text-inactive bg-transparent hover:bg-transparent";
const iconContainerStyles =
  "flex h-[18px] w-[18px] items-center justify-center";
const linkStyles = "text-caption gap-x-4px flex items-center";

// Component to render item content (icon + label)
const ItemContent = ({ item }: { item: BreadcrumbItemType }) => {
  if (item.onlyIcon) {
    return (
      <span className="p-0.5">
        <span className={iconContainerStyles}>{item.onlyIcon}</span>
      </span>
    );
  }

  if (item.leadingIcon) {
    return (
      <>
        <span className={iconContainerStyles}>{item.leadingIcon}</span>
        {item.label}
      </>
    );
  }

  return <span className="px-4px py-2px">{item.label}</span>;
};

// Component to render a single breadcrumb item
const BreadcrumbItemContent = ({ item }: { item: BreadcrumbItemType }) => {
  if (item.disabled) {
    return (
      <BreadcrumbPage className={linkStyles}>
        <ItemContent item={item} />
      </BreadcrumbPage>
    );
  }

  return (
    <BreadcrumbLink href={item.href} className={linkStyles}>
      <ItemContent item={item} />
    </BreadcrumbLink>
  );
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const renderItems = () => {
    const first = items[0];
    const middle = items.slice(1, items.length - 2);
    const lastTwo = items.slice(-2);

    return items.length >= 4 ? (
      <>
        {/* First item */}
        <BreadcrumbItem
          key={first.label}
          className={cn(
            breadcrumbItemStyles,
            first.disabled && disabledItemStyles,
            first.leadingIcon && "pl-2px pr-4px",
          )}
        >
          <ItemContent item={first} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Dropdown ellipsis for middle items */}
        <BreadcrumbItem key="ellipsis" className={cn(breadcrumbItemStyles)}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {middle.map((item) => (
                <DropdownMenuItem key={item.label}>
                  <BreadcrumbLink href={item.href} className={linkStyles}>
                    <ItemContent item={item} />
                  </BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Last two items */}
        {lastTwo.map((item, idx) => (
          <React.Fragment key={item.label}>
            <BreadcrumbItem
              className={cn(
                breadcrumbItemStyles,
                item.leadingIcon && "pl-2px pr-4px",
                item.disabled && disabledItemStyles,
                idx === lastTwo.length - 1 && "text-text-default font-semibold",
              )}
            >
              <BreadcrumbItemContent item={item} />
            </BreadcrumbItem>
            {idx < lastTwo.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </>
    ) : (
      items.map((item, idx) => (
        <React.Fragment key={item.label}>
          <BreadcrumbItem
            className={cn(
              breadcrumbItemStyles,
              item.leadingIcon && "pl-2px pr-4px",
              item.disabled && disabledItemStyles,
              idx === items.length - 1 && "text-text-default font-semibold",
            )}
          >
            <BreadcrumbItemContent item={item} />
          </BreadcrumbItem>
          {idx < items.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      ))
    );
  };

  return (
    <BaseBreadcrumb>
      <BreadcrumbList>{renderItems()}</BreadcrumbList>
    </BaseBreadcrumb>
  );
};

export { Breadcrumb };

// Base components
function BaseBreadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1 text-sm break-words",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-[18px]", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center justify-center px-1", className)}
      {...props}
    >
      <span className="text-caption text-text-light">...</span>
      <span className="sr-only">More</span>
    </span>
  );
}
