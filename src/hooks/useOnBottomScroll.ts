import {
  ForwardedRef,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import debounce from "lodash.debounce";

type OnBottomScrollOptions = {
  ref: RefObject<HTMLDivElement | undefined>;
  callback: () => void;
  offset?: number;
};

const noop = () => {};

function useOnBottomScroll(options: OnBottomScrollOptions) {
  const callback = options.callback ?? noop;
  const ref = options.ref;
  const offset = options.offset ?? 0;

  const debouncedCallback = useMemo(() => debounce(callback, 200), [callback]);

  const handleOnScroll = useCallback(() => {
    if (ref.current) {
      const scrollNode = ref.current;
      const scrollContainerBottomPosition = Math.round(
        scrollNode.scrollTop + scrollNode.clientHeight
      );
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

      if (scrollPosition <= scrollContainerBottomPosition) {
        debouncedCallback();
      }
    }
  }, [debouncedCallback]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", handleOnScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleOnScroll);
      }
    };
  }, [handleOnScroll]);
}

export default useOnBottomScroll;
