import { useAppStore } from "./common";
import "./styles.css";
import Demo1Page from "./demos/demo1";
import Demo2Page from "./demos/demo2";
import Demo3Page from "./demos/demo3";
import Demo4Page from "./demos/demo4";
import Demo5Page from "./demos/demo5";
import { useState } from "react";
const demosList = [
  {
    name: "demo1",
    component: Demo1Page,
  },
  {
    name: "demo2",
    component: Demo2Page,
  },
  {
    name: "demo3",
    component: Demo3Page,
  },
  {
    name: "demo4",
    component: Demo4Page,
  },
  {
    name: "demo5",
    component: Demo5Page,
  }
];

export default function App() {
  const activeTabKey = useAppStore((state) => state.activeTabKey);

  const [activeDemoKey, setActiveDemoKey] = useState(activeTabKey);

  const DemoComponent = demosList.find(
    (demo) => demo.name === activeDemoKey
  )?.component;

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          height: 60,
          backgroundColor: "#ccc",
          borderBottom: "1px solid #0e252f",
        }}
      >
        {demosList.map((demo) => (
          <button
            key={demo.name}
            onClick={() => {
              setActiveDemoKey(demo.name);
            }}
          >
            {demo.name}
          </button>
        ))}
      </div>
      <div style={{ height: "calc(100% - 60px)" }}>
        {DemoComponent && <DemoComponent />}
      </div>
    </div>
  );
}
