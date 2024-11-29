import { Book } from "@/types/books.type";

export interface ToolbarProps {
    language: string;
    onLanguageChange: (newLanguage: string) => void;
    seed: number;
    generateRandomSeed: () => void;
    onSeedChange: (newSeed: number) => void;
    likes: number;
    onLikesChange: (newLikes: number) => void;
    rating: number;
    onRatingChange: (newRating: number) => void;
    view: View;
    onViewChange: (newView: View) => void;
    books: Book[];
}

export type View = "list" | "module";
