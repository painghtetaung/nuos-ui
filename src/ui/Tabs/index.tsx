import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { Badge } from "@/ui/Badge";
import { cn } from "@/utils";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  notification?: boolean;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabItemWithoutContent {
  value: string;
  label: string;
  notification?: boolean;
  count?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function Tabs({
  defaultActiveTab,
  tabSmall,
  className,
  tabs,
  showContent = true,
  ...props
}: {
  defaultActiveTab: string;
  tabSmall?: boolean;
  className?: string;
  notification?: boolean;
  showContent?: boolean;
  tabs: (TabItem | TabItemWithoutContent)[];
} & React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <BaseTabs defaultValue={defaultActiveTab} className={className} {...props}>
      <BaseTabsList>
        {tabs.map((tab) => (
          <BaseTabsTrigger
            key={tab.value}
            tabSmall={tabSmall}
            value={tab.value}
            className="relative flex cursor-pointer items-center justify-center gap-x-2"
            onClick={
              typeof tab === "object" && "onClick" in tab
                ? tab.onClick
                : undefined
            }
          >
            {tab.icon && <div>{tab.icon}</div>}
            {tab.label}
            {tab.notification && (
              <div className="bg-icon-destructive absolute top-1 right-1 size-1.5 rounded-full" />
            )}
            {!!tab.count && <Badge type="primary-soft">{tab.count}</Badge>}
          </BaseTabsTrigger>
        ))}
      </BaseTabsList>
      {showContent &&
        "content" in tabs[0] &&
        tabs.map((tab) => (
          <BaseTabsContent key={tab.value} value={tab.value}>
            {(tab as TabItem).content}
          </BaseTabsContent>
        ))}
    </BaseTabs>
  );
}

// Base components
function BaseTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function BaseTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex min-h-9 w-fit flex-nowrap items-center justify-center gap-1.5 rounded-lg py-[3px]",
        className,
      )}
      {...props}
    />
  );
}

function BaseTabsTrigger({
  className,
  tabSmall,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  tabSmall?: boolean;
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "dark:data-[state=active]:text-text-default focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 hover:!bg-tab-bg-hover dark:text-text-light data-[state=active]:after:bg-icon-default text-body-sm data-[state=active]:text-text-default text-text-light relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 font-sans font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:after:absolute data-[state=active]:after:right-0 data-[state=active]:after:-bottom-1.5 data-[state=active]:after:left-0 data-[state=active]:after:mx-auto data-[state=active]:after:h-0.5 data-[state=active]:after:w-[calc(100%-16px)] data-[state=active]:after:content-[''] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        tabSmall &&
          "data-[state=active]:bg-tab-bg-active dark:data-[state=active]:bg-tab-bg-active focus-visible:border-none focus-visible:ring-0 focus-visible:outline-0 data-[state=active]:after:hidden dark:data-[state=active]:border-none",
        className,
      )}
      {...props}
    />
  );
}

function BaseTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs };
