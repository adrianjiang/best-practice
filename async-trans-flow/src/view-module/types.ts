export interface ViewModuleOption<S> {
  name: string;
  createDefaultState: () => S;
  onTabChange: (key: string) => Generator<unknown, void, unknown>;
}
