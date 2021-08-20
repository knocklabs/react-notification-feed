import { useEffect, useRef } from "react";

export default function useComponentVisible(
  isVisible: boolean,
  onClose: () => void
) {
  const ref = useRef<HTMLDivElement>(null);

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClickOutside = (event: Event) => {
    event.stopPropagation();

    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
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
