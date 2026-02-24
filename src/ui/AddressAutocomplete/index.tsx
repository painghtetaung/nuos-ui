"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Command as CommandPrimitive } from "cmdk"; // Added cmdk import
import { ChevronDown, Loader2, MapPin, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import { Button } from "@/ui/Button"; // Using Button again
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem, // CommandInput removed
  CommandList,
} from "@/ui/Combobox";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";

export interface AddressResult {
  address_components: google.maps.GeocoderAddressComponent[];
  formatted_address: string;
  geometry: {
    location: google.maps.LatLng;
  };
  place_id: string;
}

interface AddressAutocompleteProps {
  value?: string;
  onSelect: (address: google.maps.GeocoderResult, placeName: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

// Parent component: Handles Script Loading
export function AddressAutocomplete(props: AddressAutocompleteProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. Check Global
    if (window.google && window.google.maps && window.google.maps.places) {
      setScriptLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("DEBUG: Missing VITE_GOOGLE_MAPS_API_KEY");
      return;
    }

    // 2. Check Existing Script
    if (
      document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)
    ) {
      const interval = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          setScriptLoaded(true);
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }

    // 3. Load Script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Small delay to ensure it's fully parsed
      setTimeout(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          setScriptLoaded(true);
        }
      }, 100);
    };
    script.onerror = (e) => console.error("DEBUG: Script load error", e);
    document.body.appendChild(script);
  }, []);

  if (!scriptLoaded) {
    return (
      <Button
        variant="outline"
        className={cn(
          "w-full justify-between text-left font-normal",
          props.className
        )}
        disabled
      >
        {props.value || "Loading maps..."}
        <Loader2 className="ml-2 h-4 w-4 animate-spin opacity-50" />
      </Button>
    );
  }

  return <ManualPlacesAutocomplete {...props} />;
}

// Child component: Handles Autocomplete Logic Manually
function ManualPlacesAutocomplete({
  value,
  onSelect,
  className,
  placeholder = "Select...", // Updated default placeholder
  disabled = false,
}: AddressAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Debug State
  const [debugStatus, setDebugStatus] = useState<string>("IDLE");

  const serviceRef = useRef<google.maps.places.AutocompleteService | null>(
    null
  );
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>();

  useEffect(() => {
    if (open && triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  // Clean query when closed to act like a fresh search
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  // Initialize Services
  useEffect(() => {
    if (!serviceRef.current && window.google?.maps?.places) {
      serviceRef.current = new window.google.maps.places.AutocompleteService();
    }
    if (!geocoderRef.current && window.google?.maps) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
    // Create a NEW session token on mount
    if (!sessionTokenRef.current && window.google?.maps?.places) {
      sessionTokenRef.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }
  }, []);

  // Fetch Predictions
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setPredictions([]);
      setDebugStatus("QUERY_TOO_SHORT");
      return;
    }

    if (!serviceRef.current) {
      setDebugStatus("SERVICE_NOT_READY");
      return;
    }

    setLoading(true);
    setDebugStatus("FETCHING...");

    // Create token if missing
    if (!sessionTokenRef.current && window.google?.maps?.places) {
      sessionTokenRef.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }

    // Safety timeout
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
        setDebugStatus("TIMEOUT_NO_RESPONSE");
      }
    }, 5000);

    serviceRef.current.getPlacePredictions(
      {
        input: debouncedQuery,
        sessionToken: sessionTokenRef.current || undefined,
      },
      (results, status) => {
        if (!isMounted) return;
        clearTimeout(timeoutId);

        setLoading(false);
        setDebugStatus(status || "UNKNOWN_CALLBACK");

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [debouncedQuery]);

  const handleSelect = (placeId: string, mainText: string) => {
    setOpen(false);

    if (!geocoderRef.current) return;

    geocoderRef.current.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        onSelect(results[0], mainText);
        // Refresh session token for next search
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
      } else {
        console.error("Geocoding failed: ", status);
      }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          {value || (
            <p className="text-body-sm leading-body-sm text-element-inverse-disabled font-medium">
              {placeholder}
            </p>
          )}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="text-element-inverse-default bg-opacity-inverse-05 glass-effect border-stroke-inverse-slate-02 rounded-unit-corner-radius-3xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 shadow-box p-unit-8px z-[var(--z-popover)] max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto border"
        style={popoverWidth ? { width: popoverWidth } : undefined}
      >
        <Command shouldFilter={false}>
          <div className="flex h-9 items-center gap-2 px-3">
            <Search className="size-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              placeholder="Search location..."
              value={query}
              onValueChange={setQuery}
              className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {predictions.map((item) => (
                <CommandItem
                  key={item.place_id}
                  value={item.description}
                  onSelect={() =>
                    handleSelect(
                      item.place_id,
                      item.structured_formatting.main_text
                    )
                  }
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer pointer-events-auto data-[disabled=true]:pointer-events-auto data-[disabled=true]:opacity-100"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelect(
                      item.place_id,
                      item.structured_formatting.main_text
                    );
                  }}
                >
                  <MapPin className="mr-2 size-4 shrink-0 opacity-50" />
                  <span>{item.description}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
