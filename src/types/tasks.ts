import { type Statuses } from "./statuses";

export type Task = {
    id: number;
    title: string;
    status: Statuses;
};
