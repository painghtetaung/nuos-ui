import { cn } from "@/utils";
import { Input } from "@/ui/Input";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";

interface SearchInputProps extends React.ComponentProps<typeof Input> {
  searchKey: string;
  placeholder?: string;
  debounceDelay?: number;
  className?: string;
  addToParam?: boolean;
}

export function SearchInput({
  searchKey,
  placeholder = "Search by...",
  debounceDelay = 500,
  className,
  addToParam = true,
  ...props
}: SearchInputProps) {
  const [search, setSearch] = useQueryState(searchKey, {
    defaultValue: "",
  });
  const [inputValue, setInputValue] = useState(search ?? "");

  const debouncedSetValue = useCallback(
    debounce((value: string | null) => {
      if (addToParam) {
        setSearch(value);
      } else {
        setInputValue(value ?? "");
      }
    }, debounceDelay),
    [debounceDelay, addToParam, setSearch],
  );

  useEffect(() => {
    debouncedSetValue(inputValue);
    return () => {
      debouncedSetValue.cancel();
    };
  }, [inputValue, debouncedSetValue]);

  return (
    <div className={cn("relative", className)}>
      <Input
        onChange={(e) => {
          const value = e.target.value;
          setInputValue(value);
        }}
        placeholder={placeholder}
        prefixNode={{
          node: <SearchIcon className="text-element-inverse-default" />,
          withBorder: false,
        }}
        value={inputValue}
        className={cn("border-stroke-inverse-slate-03 w-full", className)}
        {...props}
      />
    </div>
  );
}
