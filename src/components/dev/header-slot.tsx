import React, {createContext, useContext, useState, useCallback, useEffect} from "react";

type Slots = {
  header?: React.ReactNode;
  toolbar?: React.ReactNode;
};

type Ctx = {
  setSlot: (name: keyof Slots, node: React.ReactNode) => void;
  clearSlot: (name: keyof Slots) => void;
  slots: Slots;
};

const SlotsCtx = createContext<Ctx | null>(null);

export function SlotsProvider({children}: {children: React.ReactNode}) {
  const [slots, setSlots] = useState<Slots>({});
  const setSlot = useCallback((name: keyof Slots, node: React.ReactNode) => {
    setSlots(s => ({ ...s, [name]: node }));
  }, []);
  const clearSlot = useCallback((name: keyof Slots) => {
    setSlots(s => ({ ...s, [name]: undefined }));
  }, []);

  return <SlotsCtx.Provider value={{ setSlot, clearSlot, slots }}>{children}</SlotsCtx.Provider>;
}

export function useSlots() {
  const ctx = useContext(SlotsCtx);
  if (!ctx) throw new Error("useSlots must be used within <SlotsProvider>");
  return ctx;
}

// Helper for children to mount/unmount content into a slot
export function UseSlot({
  name,
  children,
  deps = [],
}: {
  name: keyof Slots;
  children: React.ReactNode;
  deps?: React.DependencyList;
}) {
  const { setSlot, clearSlot } = useSlots();
  useEffect(() => {
    setSlot(name, children);
    return () => clearSlot(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); // pass relevant deps that change the slot content
  return null;
}
