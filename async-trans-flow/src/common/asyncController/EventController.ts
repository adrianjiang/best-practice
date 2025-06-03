export class EventControllers {
  private static instances: Map<string, EventControllers> = new Map();
  private token: symbol;
  private eventName: string;

  constructor(eventName: string) {
    this.eventName = eventName;
    // 如果已存在相同事件名的实例，先清理掉旧的token
    const existingInstance = EventControllers.instances.get(eventName);
    if (existingInstance) {
      existingInstance.token = null;
    }

    // 创建新的token并保存实例
    this.token = Symbol(eventName);
    EventControllers.instances.set(eventName, this);
  }

  /**
   * 检查当前controller是否仍然有效
   * @returns {boolean} 如果controller仍然有效返回true，否则返回false
   */
  check(): boolean {
    const currentInstance = EventControllers.instances.get(this.eventName);
    return currentInstance && currentInstance.token === this.token;
  }

  /**
   * 清理controller
   */
  dispose(): void {
    const currentInstance = EventControllers.instances.get(this.eventName);
    if (currentInstance && currentInstance.token === this.token) {
      EventControllers.instances.delete(this.eventName);
    }
  }

  /**
   * 获取指定事件名称的当前controller实例
   */
  static getInstance(eventName: string): EventControllers | undefined {
    return EventControllers.instances.get(eventName);
  }
}
