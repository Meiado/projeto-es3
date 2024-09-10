export interface Observer {
  notify(eventType: string, data: any): void;
}
