import { useState, useEffect, useRef } from "react";

export function useDebouncedValue(value: any, delay: any) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedEffect(effectFn: any, value: any, delay = 350) {
  const effectRef = useRef(effectFn);
  const updatedValue = useDebouncedValue(value, delay);

  useEffect(() => {
    effectRef.current = effectFn;
  }, [effectFn]);

  useEffect(() => {
    if (effectRef.current) {
      return effectRef.current(updatedValue);
    }

    return undefined;
  }, [updatedValue]);
}
