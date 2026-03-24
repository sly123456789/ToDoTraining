import { type statuses } from "./statuses";

export type Task = {
    id: number;
    title: string;
    status: statuses;
};
