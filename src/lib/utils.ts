import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UTCDate } from "@date-fns/utc";
import { formatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function relativeTime(date: Date | string | number) {
  return formatDistance(new Date(date), new UTCDate(), { addSuffix: true });
}
