import { useLayoutEffect } from "react";
import { useUILayoutStore } from "../stores/useUILayout.store";

export function useActionBar(node: React.ReactNode) {
  const setActionBar = useUILayoutStore(s => s.setActionBar);
  const clearActionBar = useUILayoutStore(s => s.clearActionBar);

  useLayoutEffect(() => {
    setActionBar(node);
    return () => clearActionBar();
  }, [node, setActionBar, clearActionBar]);
}
