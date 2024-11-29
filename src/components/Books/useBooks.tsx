import { useState, useEffect, useCallback } from "react";
import { Book } from "@/types/books.type";
import { MESSAGES } from "@/constants/messages";
import { View } from "@/types/components/toolbar.type";

const getBooks = async (
    page: number,
    isNewQuery: boolean,
    options: {
        language: string;
        seed: number;
        likes: number;
        rating: number;
    },
    callbacks: {
        setBooks: (books: Book[] | ((prevBooks: Book[]) => Book[])) => void;
        setHasMore: (hasMore: boolean) => void;
        setError: (error: string | null) => void;
        setIsLoading: (loading: boolean) => void;
    }
) => {
    try {
        if (isNewQuery) {
            console.log("isNewQuery");
            callbacks.setBooks([]);
        }

        const queryParams = new URLSearchParams({
            region: options.language,
            seed: String(options.seed),
            page: String(page),
            pageSize: "20",
            averageLikes: String(options.likes),
            averageRating: String(options.rating),
        });

        callbacks.setError(null);

        const response = await fetch(`/api/books?${queryParams.toString()}`);

        if (response.ok) {
            const data = await response.json();

            if (isNewQuery) {
                callbacks.setBooks(data.books);
                console.log("isNewQuery books");
            } else {
                callbacks.setBooks((prevBooks) => [
                    ...prevBooks,
                    ...data.books,
                ]);
                console.log("not isNewQuery books");
            }

            console.log(data.books, "books");
            callbacks.setHasMore(data.books.length === 20);
        } else {
            callbacks.setError(MESSAGES.FAILED_TO_GENERATE_BOOKS);
        }
    } catch (error) {
        callbacks.setError(`Error fetching data: ${(error as Error).message}`);
    } finally {
        callbacks.setIsLoading(false);
    }
};

export const useBooks = () => {
    const [language, setLanguage] = useState<string>("en");
    const [seed, setSeed] = useState<number>(13562);
    const [likes, setLikes] = useState<number>(4.7);
    const [rating, setRating] = useState<number>(3.7);
    const [view, setView] = useState<View>("list");
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const generateRandomSeed = useCallback(() => {
        const randomSeed = Math.floor(Math.random() * 1000000);
        setSeed(randomSeed);
    }, []);

    const fetchBooks = useCallback(
        (page: number, isNewQuery: boolean = false) => {
            if (!hasMore && !isNewQuery) return;

            setIsLoading(true);
            getBooks(
                page,
                isNewQuery,
                { language, seed, likes, rating },
                { setBooks, setHasMore, setError, setIsLoading }
            );
        },
        [language, seed, likes, rating, hasMore]
    );

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [isLoading, hasMore]);

    useEffect(() => {
        setCurrentPage(1);
        setHasMore(true);
        fetchBooks(1, true);
    }, [language, seed, likes, rating, fetchBooks]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchBooks(currentPage);
        }
    }, [currentPage, fetchBooks]);

    return {
        language,
        setLanguage,
        seed,
        setSeed,
        likes,
        setLikes,
        rating,
        setRating,
        view,
        setView,
        generateRandomSeed,
        books,
        error,
        isLoading,
        loadMore,
        hasMore,
    };
};
