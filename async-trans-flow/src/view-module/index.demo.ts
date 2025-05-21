import { generateViewModule } from "./index";

interface IDemoState {
  key: string;
  value: string;
}

const [useDemoStore, demoViewModule] = generateViewModule<IDemoState>({
  name: "demo",
  createDefaultState: () => {
    return {
      key: "1",
      value: "1",
    };
  },
  onTabChange: function* (key) {},
});
