import { useEffect, useRef } from "react";

function contains(parent: HTMLElement | null, child: HTMLElement) {
  if (!parent) return false;
  return parent === child || parent.contains(child);
}

type Options = {
  closeOnClickOutside: boolean;
};

export default function useComponentVisible(
  isVisible: boolean,
  onClose: (event: Event) => void,
  options: Options
) {
  const ref = useRef<HTMLDivElement>(null);

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose(event);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (
      options.closeOnClickOutside &&
      !contains(ref.current, event.target as HTMLElement)
    ) {
      event.stopPropagation();
      onClose(event);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("keydown", handleKeydown, true);
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isVisible]);

  return { ref };
}
