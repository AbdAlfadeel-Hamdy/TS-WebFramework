import { Callback } from "./Eventing";
import { AxiosPromise, AxiosResponse } from "axios";
import { hasId } from "./ApiSync";
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
export class Model<T extends hasId> {
  constructor(
    private events: Events,
    private sync: Sync<T>,
    private attributes: ModelAttributes<T>
  ) {}
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }
  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number")
      throw new Error("Cannot fetch data without an id!");

    this.sync
      .fecth(id)
      .then((response: AxiosResponse): void => this.set(response.data));
  }
  save(): void {
    const data = this.attributes.getAll();
    this.sync.save(data).then((response: AxiosResponse): void => {
      this.trigger("save");
    });
  }
}
