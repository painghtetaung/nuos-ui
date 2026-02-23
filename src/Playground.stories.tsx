import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Input } from "./ui/Input";
import { Avatar, AvatarStack } from "./ui/Avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Tabs } from "./ui/Tabs";
import { Tooltip, TooltipProvider } from "./ui/Tooltip";
import { Separator } from "./ui/Separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown";
import {
  ArrowRight,
  Bell,
  Download,
  LogOut,
  Plus,
  Search,
  Send,
  Settings,
  User,
} from "lucide-react";
import type { AvatarProps } from "./ui/Avatar";
import type { TabItem } from "./ui/Tabs";

function Playground() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const teamAvatars: AvatarProps[] = [
    { variant: "text", fallback: "AB" },
    { variant: "text", fallback: "CD" },
    { variant: "text", fallback: "EF" },
    { variant: "text", fallback: "GH" },
    { variant: "text", fallback: "IJ" },
  ];

  const tabs: TabItem[] = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">1,284</p>
                <p className="text-sm opacity-70">Total Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">$45.2K</p>
                <p className="text-sm opacity-70">Revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm opacity-70">Uptime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      value: "activity",
      label: "Activity",
      notification: true,
      content: (
        <div className="space-y-3 pt-4">
          {["Deployed v2.1.0", "Updated docs", "Fixed auth bug"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <Avatar variant="text" fallback={item[0]} size="sm" />
              <span className="text-sm">{item}</span>
              <Badge type="primary-soft" className="ml-auto">
                New
              </Badge>
            </div>
          ))}
        </div>
      ),
    },
    {
      value: "settings",
      label: "Settings",
      icon: <Settings className="size-4" />,
      content: <p className="pt-4 text-sm opacity-70">Settings panel</p>,
    },
  ];

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-4xl space-y-8 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Magick UI</h1>
            <p className="text-sm opacity-70">Component Playground</p>
          </div>
          <div className="flex items-center gap-3">
            <AvatarStack avatars={teamAvatars} stackCount={3} size="sm" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="glass">Glass</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button prefix={<Download />}>Download</Button>
            <Button suffix={<ArrowRight />}>Next</Button>
            <Button prefix={<Send />} suffix={<ArrowRight />}>
              Send
            </Button>
            <Tooltip
              trigger={<Button onlyIcon><Plus /></Button>}
              content="Add new item"
            />
            <Button state="loading">Loading...</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <Separator />

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Badges</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge type="primary-hard">Primary</Badge>
            <Badge type="primary-soft">Primary Soft</Badge>
            <Badge type="destructive-hard">Error</Badge>
            <Badge type="destructive-soft">Warning</Badge>
            <Badge type="secondary-hard">Secondary</Badge>
            <Badge type="secondary-soft">Neutral</Badge>
            <Badge rounded>Rounded</Badge>
          </div>
        </section>

        <Separator />

        {/* Inputs Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Inputs</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Type something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              includeCopy
              includeClear
            />
            <Input
              variant="ghost"
              placeholder="Ghost input..."
            />
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              prefixNode={{
                node: <Search className="size-4" />,
                className: "pl-3",
              }}
            />
            <Input
              aria-invalid
              placeholder="Error state"
            />
          </div>
        </section>

        <Separator />

        {/* Avatars Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Avatars</h2>
          <div className="flex items-end gap-3">
            {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
              <Tooltip
                key={size}
                trigger={
                  <Avatar variant="text" fallback="AB" size={size} />
                }
                content={size}
              />
            ))}
          </div>
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <p className="text-xs opacity-50">Active</p>
              <Avatar variant="text" fallback="ON" size="lg" status="active" />
            </div>
            <div className="space-y-1">
              <p className="text-xs opacity-50">Inactive</p>
              <Avatar
                variant="text"
                fallback="OFF"
                size="lg"
                status="inactive"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs opacity-50">Stack</p>
              <AvatarStack avatars={teamAvatars} stackCount={4} size="md" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Cards + Tabs Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Cards & Tabs</h2>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                A quick look at your project metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultActiveTab="overview" tabs={tabs} />
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button size="sm">
                <Bell className="size-4" />
                Subscribe
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </TooltipProvider>
  );
}

const meta: Meta = {
  title: "Playground",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <Playground />,
};
