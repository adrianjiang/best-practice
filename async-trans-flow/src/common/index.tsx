import { create } from "zustand";

export const useAppStore = create(() => {
  return {
    activeTabKey: "",
    activeTabTemp: Symbol(),
  };
});

export function getActiveTabKey() {
  return useAppStore.getState().activeTabKey;
}

export function getActiveTabTemp() {
  return useAppStore.getState().activeTabTemp;
}

export function selectTab(key: string) {
  useAppStore.setState({
    activeTabKey: key,
    activeTabTemp: Symbol(),
  });
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
