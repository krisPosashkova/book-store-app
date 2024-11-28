export interface ToolbarProps {
    language: string;
    onLanguageChange: (newLanguage: string) => void;
    seed: number;
    generateRandomSeed: () => void;
    onSeedChange: (newSeed: number) => void;
    likes: number;
    onLikesChange: (newLikes: number) => void;
    reviews: number;
    onReviewsChange: (newReviews: number) => void;
    view: View;
    onViewChange: (newView: View) => void;
}

export type View = "list" | "module";
