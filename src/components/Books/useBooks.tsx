import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { Book } from "@/types/books.type";
import { MESSAGES } from "@/constants/messages";
import { View } from "@/types/components/toolbar.type";

export const useBooks = () => {
    const [language, setLanguage] = useState<string>("en");
    const [seed, setSeed] = useState<number>(13562);
    const [likes, setLikes] = useState<number>(3.7);
    const [reviews, setReviews] = useState<number>(4.7);
    const [view, setView] = useState<View>("list");
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const generateRandomSeed = () => {
        const randomSeed = Math.floor(Math.random() * 1000000);
        setSeed(randomSeed);
    };

    const fetchBooks = useCallback(
        debounce(async (page: number, isNewQuery: boolean = false) => {
            if (!hasMore && !isNewQuery) return;

            const queryParams = new URLSearchParams({
                region: language,
                seed: String(seed),
                page: String(page),
                pageSize: "20",
                averageLikes: String(likes),
                averageReviews: String(reviews),
            });

            setError(null);
            setIsLoading(true);

            try {
                const response = await fetch(
                    `/api/books?${queryParams.toString()}`
                );

                if (response.ok) {
                    const data = await response.json();

                    if (isNewQuery) {
                        setBooks(data.books);
                    } else {
                        setBooks((prevBooks) => [...prevBooks, ...data.books]);
                    }

                    setHasMore(data.books.length === 20);
                } else {
                    setError(MESSAGES.FAILED_TO_GENERATE_BOOKS);
                }
            } catch (error) {
                setError(`Error fetching data: ${(error as Error).message}`);
            } finally {
                setIsLoading(false);
            }
        }, 500),
        [language, seed, likes, reviews, hasMore]
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
    }, [language, seed, likes, reviews]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchBooks(currentPage);
        }
    }, [currentPage]);

    return {
        language,
        setLanguage,
        seed,
        setSeed,
        likes,
        setLikes,
        reviews,
        setReviews,
        view,
        setView,
        generateRandomSeed,
        books,
        error,
        isLoading,
        loadMore,
    };
};
