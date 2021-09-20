import { parseISO, formatDistance } from "date-fns";
import { ReactNode } from "react";

export function formatBadgeCount(count: number): string | number {
  return count > 9 ? "9+" : count;
}

export function formatTimestamp(ts: string) {
  try {
    const parsedTs = parseISO(ts);
    const formatted = formatDistance(parsedTs, new Date(), { addSuffix: true });
    return formatted;
  } catch (e) {
    return ts;
  }
}

export function toSentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function renderNodeOrFallback(node: ReactNode, fallback: ReactNode) {
  return node !== undefined ? node : fallback;
}
