import { create, UseBoundStore, StoreApi } from "zustand";
import { ViewModuleOption } from "./types";
import { getActiveTabKey, getActiveTabTemp } from "../common";

interface ViewModuleActionOption<T> {
  createDefaultState: () => T;
  store: UseBoundStore<StoreApi<T>>;
}

class ViewModuleAction<T> {
  _option: ViewModuleActionOption<T>;
  store: UseBoundStore<StoreApi<T>>;
  stateCacheMap: Map<string, T> = new Map();

  constructor(option: ViewModuleActionOption<T>) {
    this._option = option;
    this.store = option.store;
  }
  private _setStateCache(key: string, state: Partial<T>) {
    if (!this.stateCacheMap.has(key)) {
      this.stateCacheMap.set(key, this._option.createDefaultState());
    }
    const stateCache = this.stateCacheMap.get(key)!;

    Object.assign(stateCache, state);
  }

  private _getStateCache(key: string) {
    const stateCache = this.stateCacheMap.get(key);
    if (!stateCache) {
      this.stateCacheMap.set(key, this._option.createDefaultState());
    }
    return this.stateCacheMap.get(key)!;
  }

  public refreshState(key: string) {
    console.log("refreshState", key);

    const activeTabKey = getActiveTabKey();

    if (activeTabKey !== key) {
      return;
    }

    const stateCache = this._getStateCache(key);
    this.store.setState((state) => {
      return {
        ...state,
        ...stateCache,
      };
    });
  }

  public updateState(key: string, state: Partial<T>) {
    console.log("updateState", key, state);

    this._setStateCache(key, state);

    this.refreshState(key);
  }
}

const globalModuleList: ViewModuleOption<unknown>[] = [];
export function generateViewModule<T>(
  option: ViewModuleOption<T>
): [UseBoundStore<StoreApi<T>>, ViewModuleAction<T>] {
  const useStore = create(option.createDefaultState);
  const module = new ViewModuleAction({
    createDefaultState: option.createDefaultState,
    store: useStore,
  });

  globalModuleList.push(option);
  return [useStore, module];
}

export async function callAutoAbortFlow<K>(
  gen: Generator<Promise<unknown>, void, any>
) {
  const startTemp = getActiveTabTemp();

  while (true) {
    const { value, done } = await gen.next();
    if (done) break;

    if (getActiveTabTemp() !== startTemp) {
      console.log("abort - before");

      return;
    }

    // value 可能是 Promise（yield await delay）
    // 也可能是同步值（yield demoViewModule.updateState）
    await Promise.resolve(value);

    if (getActiveTabTemp() !== startTemp) {
      console.log("abort - after");

      return;
    }
    // 如果你只想在“delay”那步停一下，可以：
    // if (value instanceof Promise) { /* … */ }
  }
}
