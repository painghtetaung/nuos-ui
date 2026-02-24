import { cn } from "@/utils";
import { Spinner } from "@/registry/ui/spinner";
import { Badge } from "@/ui/Badge";
import { ProgressIndicator } from "@/ui/ProgressIndicator";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useHover } from "@uidotdev/usehooks";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle } from "lucide-react";
import {
  IconsaxBriefcaseBold,
  MagickoAdd,
  MagickoCopy,
  MagickoCopySuccess,
} from "magick-icons";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/ui/Button";
import IconButton from "@/ui/IconButton";
import IconProfile from "@/ui/IconProfile";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { Text } from "@/ui/Text";

type TableProps<T> = {
  columns: ColumnDef<T, keyof T>[];
  tableData: T[];
  isLoading?: boolean;
  emptyState?: {
    emptyAction?: () => void;
    label: string;
    icon: React.ReactNode;
  };
  onRowClick?: (row: T) => void;
};

const Table = <T,>({
  columns,
  tableData,
  isLoading = false,
  emptyState = {
    emptyAction: undefined,
    label: "There is currently no data available to display in this table.",
    icon: <IconProfile icon={<IconsaxBriefcaseBold />} color="teal" />,
  },
  onRowClick,
}: TableProps<T>) => {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rowCount = table.getRowModel().rows.length;

  return (
    <div className="relative flex flex-col overflow-auto">
      {isLoading ? (
        <div
          className={cn(
            rowCount === 0 ? "" : "bg-gray-100 dark:bg-gray-700",
            "absolute top-10 left-0 w-full h-full min-h-[100px] opacity-70 z-10 flex items-center justify-center"
          )}
        >
          <Spinner className="size-10 text-stroke-inverse-slate-04 " />
        </div>
      ) : null}

      {!isLoading && rowCount === 0 ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2">
          <div className="flex flex-col items-center gap-4">
            {emptyState?.icon}
            <Text>{emptyState?.label}</Text>
            {emptyState?.emptyAction ? (
              <Button
                variant={"outline"}
                prefix={
                  <MagickoAdd className="[&_path]:fill-element-inverse-default" />
                }
                onClick={() => emptyState?.emptyAction?.()}
              >
                Create new
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="max-w-full flex-1 overflow-x-auto">
        <table
          className="w-full caption-bottom text-sm"
          style={{ minWidth: "max-content" }}
        >
          <thead className="bg-fill-inverse-slate-03">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="hover:bg-muted/50 border-stroke-inverse-slate-02 border-b transition-colors"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="relative">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="hover:bg-muted/50 bg-table-table-cell-unselected group/row border-stroke-inverse-slate-02 cursor-pointer border-b transition-colors"
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}

            {rowCount === 0 &&
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={columns.length} className="h-12 p-4">
                    <div className="" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// PrimaryCell component with variants (no explicit default variant)
const primaryCellVariants = cva(
  "flex items-center gap-2 text-body-sm text-element-inverse-default",
  {
    variants: {
      variant: {
        badge: "",
        progress: "",
        error: "text-element-inverse-red flex items-center gap-2",
      },
    },
  }
);

export interface PrimaryCellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof primaryCellVariants> {
  children?: React.ReactNode;
  badgeContent?: React.ReactNode;
  badgeType?:
    | "primary-hard"
    | "primary-soft"
    | "destructive-hard"
    | "destructive-soft"
    | "secondary-hard"
    | "secondary-soft";
  badgeSize?: "sm" | "md";
  progressValue?: number;
  progressMax?: number;
  showProgressPercentage?: boolean;
  errorMessage?: string;
  hoverUI?: React.ReactNode;
}

const PrimaryCell = React.forwardRef<HTMLDivElement, PrimaryCellProps>(
  (
    {
      variant,
      badgeContent,
      children,
      badgeType,
      badgeSize = "sm",
      progressValue,
      progressMax = 100,
      showProgressPercentage = false,
      errorMessage,
      hoverUI,
      ...props
    },
    ref
  ) => {
    let content: React.ReactNode = children;

    if (variant === "badge") {
      content = (
        <div className="flex items-center gap-2">
          {children}
          {badgeContent && (
            <Badge type={badgeType} size={badgeSize}>
              {badgeContent}
            </Badge>
          )}
        </div>
      );
    } else if (variant === "progress") {
      content = (
        <>
          {progressValue !== 100 && (
            <ProgressIndicator
              variant="circle"
              value={progressValue || 0}
              max={progressMax}
              showPercentage={showProgressPercentage}
            />
          )}
          {children && (
            <span className="text-body-sm text-element-inverse-default">
              {children}
            </span>
          )}
        </>
      );
    } else if (variant === "error") {
      content = (
        <>
          <AlertCircle className="size-4 shrink-0" />
          {errorMessage ? (
            <span className="text-body-sm">{errorMessage}</span>
          ) : (
            children
          )}
        </>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(primaryCellVariants({ variant }))}
        {...props}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">{content}</div>
        {hoverUI && (
          <div className="ml-2 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover/row:opacity-100">
            {hoverUI}
          </div>
        )}
      </div>
    );
  }
);

PrimaryCell.displayName = "PrimaryCell";

// Attach PrimaryCell as a compound component
Table.PrimaryCell = PrimaryCell;

const TextCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    text: string | number | undefined;
    copyable?: boolean;
    className?: string;
  }
>(({ text, copyable = true, className, ...props }, ref) => {
  const [isCopied, setIsCopied] = useState(false);
  const [hoverRef, isHovering] = useHover();

  const handleCopy = () => {
    navigator.clipboard.writeText(text as string);
    setIsCopied(true);
  };

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1200);
    }
  }, [isCopied]);

  return (
    <div className={cn("w-full h-full", className)} ref={ref} {...props}>
      <div className="relative" ref={hoverRef}>
        {copyable && isHovering && (
          <IconButton
            icon={
              isCopied ? (
                <MagickoCopySuccess
                  className={cn(
                    isCopied ? "size-4 scale-115" : "size-4",
                    "transition-all ease-in duration-200"
                  )}
                />
              ) : (
                <MagickoCopy className="size-4" />
              )
            }
            className="absolute top-1/2 -right-3 -translate-y-1/2"
            size="sm"
            varient="soft"
            onClick={handleCopy}
          />
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Text className="truncate line-clamp-1">{text ?? "-"}</Text>
          </PopoverTrigger>
          <PopoverContent className="">
            <Text>{text ?? "-"}</Text>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});

TextCell.displayName = "TextCell";
Table.TextCell = TextCell;

export default Table;
