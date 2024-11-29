import React, { useRef } from "react";
import { Grid2, Box, CircularProgress } from "@mui/material";
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
            }}>
            <Grid2
                container
                spacing={2}
                sx={{
                    pt: 5,
                    pb: "100px",
                }}>
                {books.map((book) => (
                    <CardBook key={book.index} book={book} />
                ))}
            </Grid2>
        </Box>
    );
};

export default GalleryBooks;
