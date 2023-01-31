import { Callback } from "./Eventing";
import { AxiosPromise } from "axios";
interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fecth(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}
export class Model {}
