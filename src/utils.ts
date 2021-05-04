import { parseISO, formatRelative } from "date-fns";

export function formatBadgeCount(count: number): string | number {
  return count > 9 ? "9+" : count;
}

export function formatTimestamp(ts: string) {
  try {
    const parsedTs = parseISO(ts);
    const formatted = formatRelative(parsedTs, new Date());
    return toSentenceCase(formatted);
  } catch (e) {
    return ts;
  }
}

export function toSentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
