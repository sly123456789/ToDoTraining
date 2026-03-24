export const statusesList = ["Not started", "In progress", "Done"];

export type statuses = (typeof statusesList)[number];

export function isStatus(value: string): value is statuses {
    return statusesList.includes(value as statuses);
}

export const defaultStatus: statuses = "Not started";