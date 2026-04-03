export const statusesList = ["To do", "In progress", "Done"];

export type Statuses = (typeof statusesList)[number];

export function isStatus(value: string): value is Statuses {
    return statusesList.includes(value as Statuses);
}

export const defaultStatus: Statuses = "To do";
