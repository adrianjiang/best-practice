import React from "react";
import { selectTab, useAppStore } from "../common";

interface TabsLayoutProps {
  children: React.ReactNode;
  options: {
    key: string;
    label: string;
  }[];
}

export function TabsLayout(props: TabsLayoutProps) {
  const { activeTabKey } = useAppStore();
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{ width: 200, height: "100%", borderRight: "1px solid #ccc" }}
      >
        {props.options.map((option) => (
          <div
            style={{
              backgroundColor: option.key === activeTabKey ? "#ccc" : "#fff",
              height: 60,
              cursor: "pointer",
            }}
            key={option.key}
            onClick={() => {
              selectTab(option.key);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
      <div style={{ width: "calc(100% - 200px)", height: "100%" }}>
        {props.children}
      </div>
    </div>
  );
}
