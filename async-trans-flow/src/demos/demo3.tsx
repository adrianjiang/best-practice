import { TabsLayout } from "../components/TabsLayout";
import { delay, useAppStore } from "../common";
import { useEffect } from "react";
import { callAutoAbortFlow, generateViewModule } from "../view-module";

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

export default function Demo1() {
  const { activeTabKey } = useAppStore();
  const demoStore = useDemoStore((state) => state);

  function* handleTabChange(key: string) {
    const time = new Date().getTime();
    const baseKey = `${key} - ${time}`;
    demoViewModule.updateState(key, {
      key: `${baseKey} - 1`,
      value: `${baseKey} - 1`,
    });
    yield delay(1000);
    demoViewModule.updateState(key, {
      key: `${baseKey} - 2`,
      value: `${baseKey} - 2`,
    });
    yield delay(1000);
    demoViewModule.updateState(key, {
      key: `${baseKey} - 3`,
      value: `${baseKey} - 3`,
    });
    yield delay(1000);
    demoViewModule.updateState(key, {
      key: `${baseKey} - 4`,
      value: `${baseKey} - 4`,
    });
    yield delay(1000);

    demoViewModule.updateState(key, {
      key: `${baseKey} - 4`,
      value: `${baseKey} - 4`,
    });
  }

  useEffect(() => {
    if (!activeTabKey) return;
    callAutoAbortFlow(handleTabChange(activeTabKey));
  }, [activeTabKey]);

  return (
    <TabsLayout
      options={[
        {
          key: "1",
          label: "tab1",
        },
        {
          key: "2",
          label: "tab2",
        },
      ]}
    >
      <div>activeTabKey: {activeTabKey}</div>

      <div>demoStore.key: {demoStore.key}</div>
      <div>demoStore.value: {demoStore.value}</div>
    </TabsLayout>
  );
}
