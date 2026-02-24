import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  if (!name) return "";
  const nameParts = name?.split(" ");
  if (nameParts?.length === 1) {
    return nameParts[0][0];
  }
  return nameParts[0][0] + nameParts[nameParts.length - 1][0];
}

export function getFirstName(name: string) {
  if (!name) return "";
  const nameParts = name?.split(" ");
  return nameParts[0];
}

export function truncateFileNameMid(name: string, maxLength = 28) {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex === -1 || name.length <= maxLength) return name;
  const ext = name.slice(dotIndex);
  const base = name.slice(0, dotIndex);
  const keep = maxLength - ext.length - 3;
  if (keep <= 0) return `...${ext}`;
  const startLen = Math.ceil(keep / 2);
  const endLen = Math.floor(keep / 2);
  return `${base.slice(0, startLen)}...${base.slice(-endLen)}${ext}`;
}

export function getFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`;
  return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export function getPaginationItems(currentPage: number, totalPages: number, maxLength: number) {
  const res: Array<number> = [];
  if (totalPages <= maxLength) {
    for (let i = 1; i <= totalPages; i++) res.push(i);
    return res;
  }
  res.push(1);
  let start = Math.max(currentPage - Math.floor(maxLength / 2), 2);
  let end = Math.min(start + maxLength - 2, totalPages - 1);
  if (end - start < maxLength - 2) start = Math.max(end - maxLength + 2, 2);
  if (start > 2) res.push(-1);
  for (let i = start; i <= end; i++) res.push(i);
  if (end < totalPages - 1) res.push(-1);
  res.push(totalPages);
  return res;
}
