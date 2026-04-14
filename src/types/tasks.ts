import { type Statuses } from "./statuses";

export type Task = {
    id: string;
    title: string;
    status: Statuses;
};
