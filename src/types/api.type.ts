import { Book } from "./books.type";
export type MetaType = {
    count: number;
    page: number;
    pageSize: number;
    attempts: number;
    warning?: string;
};

export type ResponseType = {
    meta: MetaType;
    books: Book[];
};
