import axios, { AxiosPromise } from "axios";

export interface hasId {
  id?: number;
}
export class ApiSync<T extends hasId> {
  constructor(public rootUrl: string) {}
  fecth(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }
  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) return axios.put(`${this.rootUrl}/${id}`, data);
    else return axios.post(this.rootUrl, data);
  }
}