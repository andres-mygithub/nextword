import { useEffect, useRef } from "react";

const useKey = (key, cb) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(e) {
      if (e.code === key) {
        callbackRef.current(e);
      }
    }
    document.addEventListener("keyup", handle);
    return () => {
      document.removeEventListener("keyup", handle);
    };
  }, [key]);
};
export default useKey;
