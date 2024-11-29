import React, { useRef } from "react";
import { Grid2, Box } from "@mui/material";
import { Book } from "@/types/books.type";
import CardBook from "./CardBook";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface GalleryBooksProps {
    books: Book[];
    onLoadMore: () => void;
}

const GalleryBooks: React.FC<GalleryBooksProps> = ({ books, onLoadMore }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useInfiniteScroll(onLoadMore, containerRef);

    return (
        <Box
            ref={containerRef}
            sx={{
                maxHeight: "calc(100svh - 150px)",
                overflowY: "auto",
                scrollbarGutter: "stable",
            }}>
            <Grid2
                container
                spacing={2}
                sx={{
                    pt: 5,
                    pb: "100px",
                }}>
                {books.map((book, index) => (
                    <CardBook key={`${book.id}-${index}`} book={book} />
                ))}
            </Grid2>
        </Box>
    );
};

export default GalleryBooks;
