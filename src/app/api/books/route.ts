import { NextRequest, NextResponse } from "next/server";
import {
    localeConfigs,
    setPseudoRandomSeed,
    generateBook,
} from "@/utils/server";
import { Book } from "@/types/books.type";
import {
    MAX_ATTEMPTS,
    TOLERANCE_STEP,
    MAX_TOLERANCE,
    BASE_TOLERANCE,
} from "@/constants/constants";
import { isBookMatchingCriteria } from "@/utils/server";
import { ResponseType } from "@/types/api.type";
import { MESSAGES } from "@/constants/messages";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const region = searchParams.get("region") || "en";
        const seed = Number(searchParams.get("seed") || Date.now());
        const page = Math.max(1, Number(searchParams.get("page")) || 1);
        const pageSize = Math.min(
            100,
            Math.max(1, Number(searchParams.get("pageSize")) || 20)
        );
        const targetLikes = Number(searchParams.get("averageLikes") || 3.7);
        const targetRating = Number(searchParams.get("averageRating") || 4.7);

        const config = localeConfigs[region as keyof typeof localeConfigs];
        if (!config) {
            return NextResponse.json(
                { error: MESSAGES.INVALID_REGION },
                { status: 400 }
            );
        }

        setPseudoRandomSeed(seed, page, config.faker);

        const matchingBooks: Book[] = [];
        let attempts = 0;
        let currentIndex = (page - 1) * pageSize;
        let currentTolerance = BASE_TOLERANCE;

        while (matchingBooks.length < pageSize && attempts < MAX_ATTEMPTS) {
            const book = generateBook(currentIndex, config.faker);

            if (
                isBookMatchingCriteria(
                    book,
                    targetLikes,
                    targetRating,
                    currentTolerance
                )
            ) {
                matchingBooks.push(book);
            }
            if (attempts % 20 === 0 && matchingBooks.length < pageSize / 2) {
                currentTolerance = Math.min(
                    currentTolerance + TOLERANCE_STEP,
                    MAX_TOLERANCE
                );
            }

            currentIndex++;
            attempts++;
        }

        const updatedBooks = matchingBooks.map((book, index) => ({
            ...book,
            index: (page - 1) * pageSize + index + 1,
        }));

        const response: ResponseType = {
            books: updatedBooks,
            meta: {
                count: matchingBooks.length,
                page,
                pageSize,
                attempts,
            },
        };

        if (matchingBooks.length < pageSize) {
            response.meta.warning =
                MESSAGES?.BOOKS_WARNING(matchingBooks.length) ||
                MESSAGES.FAILED_TO_GENERATE_BOOKS;
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error(MESSAGES.FAILED_TO_GENERATE_BOOKS, error);
        return NextResponse.json(
            { error: MESSAGES.FAILED_TO_GENERATE_BOOKS },
            { status: 500 }
        );
    }
}
