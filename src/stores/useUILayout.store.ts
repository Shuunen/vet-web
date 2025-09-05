import { create } from 'zustand';
import { ReactNode } from 'react';

interface UILayoutStore {
  actionBar: ReactNode | null;
  setActionBar: (content: ReactNode | null) => void;
  clearActionBar: () => void;
}

export const useUILayoutStore = create<UILayoutStore>((set) => ({
  actionBar: null,
  setActionBar: (content) => set({ actionBar: content }),
  clearActionBar: () => set({ actionBar: null }),
}));