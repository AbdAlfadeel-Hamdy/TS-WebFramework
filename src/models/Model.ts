import { Callback } from "./Eventing";
import { AxiosPromise, AxiosResponse } from "axios";
import { HasId } from "./ApiSync";
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
export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private sync: Sync<T>,
    private attributes: ModelAttributes<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

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
