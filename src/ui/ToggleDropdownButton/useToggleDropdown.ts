import { useState, useCallback } from "react";

export const useToggleDropdown = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    setIsOpen,
  };
};

