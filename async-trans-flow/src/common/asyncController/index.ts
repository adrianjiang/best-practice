import { AsyncController } from './AsyncController'

// 统一管理所有的控制器
export const AppControllers = {
  // tab切换的场景
  tabSwitchScene: new AsyncController(),
  // 可以添加更多控制器...
} as const
