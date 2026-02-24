import { ChevronLeft, ChevronRight } from "magick-icons";
import { parseAsInteger, useQueryStates } from "nuqs";
import { Button } from "@/ui/Button";
import ButtonDropdown from "@/shared/components/ui/button-dropdown";
import { cn, getPaginationItems } from "@/utils";
import IconButton from "@/ui/IconButton";
import IconContainer from "@/ui/IconContainer";

/**
 * Pagination Component
 *
 * This component can be used without props, but you need to handle URL query parameters.
 * It uses `useQueryStates` from `nuqs` to manage pagination state via URL query params:
 * - `currentPage`: Current page number (default: 1)
 * - `totalPages`: Total number of pages (default: 5)
 * - `pageSize`: Number of items per page (default: 10)
 *
 * The component automatically syncs with URL query parameters, so you can:
 * - Share paginated URLs
 * - Navigate back/forward through browser history
 * - Bookmark specific pages
 *
 * @example
 * ```tsx
 * // Simply use the component - it will read/write to URL query params
 * <Pagination />
 *
 * // The URL will automatically update like:
 * // ?currentPage=2&totalPages=10&pageSize=25
 * ```
 */
const Pagination = () => {
  const [filter, setFilter] = useQueryStates({
    currentPage: parseAsInteger.withDefault(1),
    totalPages: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
  });

  const MAX_LENGTH = 4;
  const PAGE_SIZE_OPTIONS = [10, 25, 50];

  const paginationItems = getPaginationItems(
    filter.currentPage,
    filter.totalPages,
    MAX_LENGTH
  );

  return (
    <div>
      <div className="flex items-center justify-between px-2 py-4 gap-4">
        <div className="flex items-center gap-2">
          {/* <Button
          variant="outline"
          size="sm"
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                currentPage: Math.max(1, prev.currentPage - 1),
              }))
            }
          disabled={filter.currentPage === 1}
        >
            
          </Button> */}
          <IconButton
            disableTheme={true}
            disabled={filter.currentPage === 1}
            varient={"ghost"}
            icon={
              <IconContainer
                className={
                  filter.currentPage === 1
                    ? "[&_path]:fill-element-inverse-disabled"
                    : ""
                }
              >
                <ChevronLeft />
              </IconContainer>
            }
            size="sm"
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                currentPage: Math.max(1, prev.currentPage - 1),
              }))
            }
          />
          <div className="flex items-center gap-1">
            {paginationItems.map((page, i) =>
              page === -1 ? (
                <Button
                  key={`ellipsis-${i}`}
                  variant="ghost"
                  size="md"
                  disabled
                >
                  ...
                </Button>
              ) : (
                <Button
                  key={page}
                  variant={
                    filter.currentPage === page ? "secondary" : "outline"
                  }
                  size="md"
                  className="px-3! py-1!"
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      currentPage: page,
                    }))
                  }
                >
                  {page}
                </Button>
              )
            )}
          </div>
          {/* <Button
          variant="outline"
            
          size="sm"
          onClick={() =>
              setFilter((prev) => ({
                ...prev,
                currentPage: Math.min(
                  filter.totalPages,
                  prev.currentPage + 1,
                ),
              }))
          }
          disabled={filter.currentPage === filter.totalPages}
        >
            {">"}
          </Button> */}
          <IconButton
            disableTheme={true}
            disabled={filter.currentPage === filter.totalPages}
            varient={"ghost"}
            icon={
              <IconContainer
                className={
                  filter.currentPage === filter.totalPages
                    ? "[&_path]:fill-element-inverse-disabled"
                    : ""
                }
              >
                <ChevronRight />
              </IconContainer>
            }
            size="sm"
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                currentPage: Math.min(filter.totalPages, prev.currentPage + 1),
              }))
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-caption">Result per page</span>
          <ButtonDropdown
            activeAs="label"
            activeValue={String(filter.pageSize)}
            dropdownContent={{
              className: "min-w-[96px]!",
              align: "end",
            }}
            options={PAGE_SIZE_OPTIONS.map((size) => ({
              label: String(size),
              value: String(size),
              isActive: filter.pageSize === size,
              onClick: () => {
                setFilter((prev) => ({
                  ...prev,
                  currentPage: 1,
                  pageSize: size,
                }));
              },
            }))}
            buttonProps={{
              size: "sm",
              variant: "outline",
              className: "h-7 px-2! py-1! border-stroke-inverse-slate-03",
              renderChildren: (activeOption) => (
                <div className="flex items-center gap-x-1">
                  <span
                    className={cn(
                      "text-body-xs",
                      activeOption ? "text-element-inverse-default" : ""
                    )}
                  >
                    {activeOption ? activeOption.label : filter.pageSize}
                  </span>
                </div>
              ),
              arrowIconProps: {
                className: "[&_path]:fill-icon-default",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
