export interface Review {
    rating: number;
    text: string;
    author: string;
}

export interface Book {
    index: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    likes: number;
    reviews: Review[];
    genre: string;
    coverImage: string;
}

export interface BookItemProps {
    item: Book;
}

export interface BooksProps {
    books: Book[];
}

export interface BookAverages {
    likes: number;
    rating: number;
}
