import React, { useEffect, useRef, useState } from 'react';
import { Subject, switchMap, debounceTime, distinctUntilChanged, of, delay } from 'rxjs';
import { ajax } from 'rxjs/ajax';

interface TabData {
  id: number;
  title: string;
  content: string;
}

const TabsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TabData | null>(null);
  
  // 创建一个 Subject 用于处理 tab 切换
  const tabChange$ = useRef(new Subject<number>());

  useEffect(() => {
    // 设置 tab 切换的订阅
    const subscription = tabChange$.current.pipe(
      debounceTime(300), // 防抖
      distinctUntilChanged(), // 避免重复请求
      switchMap(tabId => {
        setLoading(true);
        // 模拟 API 请求
        return of({
          id: tabId,
          title: `Tab ${tabId} Content`,
          content: `This is the content for tab ${tabId}. It was loaded after a delay.`
        }).pipe(delay(Math.random() * 1000)); // 1.5秒延迟
      })
    ).subscribe({
      next: (response: any) => {
        setData(response);
        setLoading(false);
      },
      error: (error) => {
        console.error('Error loading tab data:', error);
        setLoading(false);
      }
    });

    // 初始加载
    tabChange$.current.next(activeTab);

    // 清理订阅
    return () => subscription.unsubscribe();
  }, []);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    tabChange$.current.next(tabId);
  };

  return (
    <div className="tabs-container">
      <div>rxjs方案</div>
      <div className="tabs-header">
        {[1, 2, 3].map(tabId => (
          <button
            key={tabId}
            className={`tab-button ${activeTab === tabId ? 'active' : ''}`}
            onClick={() => handleTabClick(tabId)}
          >
            Tab {tabId}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          data && (
            <div>
              <h3>{data.title}</h3>
              <p>{data.content}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TabsDemo;