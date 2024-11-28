import { Faker, fakerEN, fakerPL, fakerPT_BR } from "@faker-js/faker";
import { Book, Review } from "@/types/books.type";
import { BookAverages } from "@/types/books.type";

import { URL_IMAGE_FIKER } from "@/constants/constants";

export const localeConfigs = {
    en: {
        faker: fakerEN,
    },
    pl: {
        faker: fakerPL,
    },
    pt_BR: {
        faker: fakerPT_BR,
    },
};

export function setPseudoRandomSeed(seed: number, page: number, faker: Faker) {
    faker.seed([seed, page]);
}

export function generateReviews(
    averageReviews: number,
    localFaker: Faker
): Review[] {
    const times = (n: number, fn: () => Review) => {
        const fullTimes = Math.floor(n);
        const reviews = Array.from({ length: fullTimes }, fn);

        if (localFaker.number.float({ min: 0, max: 1 }) < n % 1) {
            reviews.push(fn());
        }

        return reviews;
    };

    return times(averageReviews, () => ({
        rating: Number(localFaker.number.float({ min: 0, max: 5 }).toFixed(1)),
        text: localFaker.lorem.paragraph(),
        author: localFaker.person.fullName(),
    }));
}

export function generateBook(index: number, localFaker: Faker): Book {
    const combinedSeed = localFaker.commerce.isbn();

    return {
        index,
        isbn: localFaker.commerce.isbn(),
        title: localFaker.book.title(),
        genre: localFaker.book.genre(),
        author: localFaker.book.author(),
        publisher: localFaker.book.publisher(),
        likes: Number(localFaker.number.float({ min: 0, max: 10 }).toFixed(1)),
        reviews: generateReviews(
            Number(localFaker.number.float({ min: 0, max: 10 }).toFixed(1)),
            localFaker
        ),
        coverImage: `${URL_IMAGE_FIKER}/seed/${combinedSeed}/400/300/`,
    };
}

export function getBookAverages(book: Book): BookAverages {
    const avgRating = book.reviews.length
        ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
          book.reviews.length
        : 0;

    return {
        likes: book.likes,
        rating: avgRating,
    };
}

export function isBookMatchingCriteria(
    book: Book,
    targetLikes: number,
    targetRating: number,
    tolerance: number
): boolean {
    const averages = getBookAverages(book);

    return (
        Math.abs(averages.likes - targetLikes) <= tolerance &&
        Math.abs(averages.rating - targetRating) <= tolerance
    );
}
