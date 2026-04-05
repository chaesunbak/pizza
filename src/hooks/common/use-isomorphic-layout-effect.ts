import { useEffect, useLayoutEffect } from "react";

/**
 * Custom hook that uses `useLayoutEffect` on the client and `useEffect` on the server (SSR).
 * This helps avoid hydration warnings in SSR environments like Next.js.
 * @see [usehooks-ts.com/react-hook/use-isomorphic-layout-effect](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect)
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
