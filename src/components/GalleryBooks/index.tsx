import React, { useRef } from "react";
import { Grid2, Box, CircularProgress } from "@mui/material";
import { Book } from "@/types/books.type";
import CardBook from "./CardBook";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface GalleryBooksProps {
    books: Book[];
    onLoadMore: () => void;
    isLoading: boolean;
}

const GalleryBooks: React.FC<GalleryBooksProps> = ({
    books,
    onLoadMore,
    isLoading,
}) => {
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
                    pb: 5,
                }}>
                {books.map((book) => (
                    <CardBook key={book.index} book={book} />
                ))}
            </Grid2>
            {isLoading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        p: 2,
                    }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default GalleryBooks;
