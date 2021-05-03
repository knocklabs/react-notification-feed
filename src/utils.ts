import { parseISO, formatRelative } from "date-fns";

export function formatBadgeCount(count: number): string | number {
  return count > 9 ? "9+" : count;
}

export function formatTimestamp(ts: string) {
  const formatted = formatRelative(parseISO(ts), new Date());

  console.log(formatted);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
