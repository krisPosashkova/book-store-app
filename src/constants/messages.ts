import { IMessages } from "@/types/messages.type";

export const MESSAGES: IMessages = {
    INVALID_REGION: "Invalid region",
    FAILED_TO_GENERATE_BOOKS: "Failed to generate books",
    BOOKS_WARNING: (count: number) =>
        `Found only ${count} books matching criteria`,
};
