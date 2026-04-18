import {COLUMN_TYPES} from "../lib/constants.ts";

export type ColumnState = typeof COLUMN_TYPES[keyof typeof COLUMN_TYPES];

export type TaskType = {
    title: string;
    state: ColumnState;
}