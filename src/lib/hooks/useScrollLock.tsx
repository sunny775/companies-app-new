import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollLockResult {
  lockScroll: () => void;
  unlockScroll: () => void;
  isLocked: boolean;
}

const useScrollLock = (): UseScrollLockResult => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const scrollPosition = useRef<number>(0);

  const lockScroll = useCallback((): void => {
    if (!isLocked) {
      scrollPosition.current = window.pageYOffset;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = "100%";
      setIsLocked(true);
    }
  }, [isLocked]);

  const unlockScroll = useCallback((): void => {
    if (isLocked) {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      window.scrollTo(0, scrollPosition.current);
      setIsLocked(false);
    }
  }, [isLocked]);

  // Clean up if component unmounts while scroll is locked
  useEffect(() => {
    return () => {
      if (isLocked) {
        unlockScroll();
      }
    };
  }, [isLocked, unlockScroll]);

  return { lockScroll, unlockScroll, isLocked };
};

export default useScrollLock;
