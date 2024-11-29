"use client";
import React from "react";
import {
    Box,
    useTheme,
    useMediaQuery,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import CustomToolbar from "@/components/CustomToolbar";
import GalleryBooks from "@/components/GalleryBooks";
import TableBook from "@/components/TableBooks";
import { useBooks } from "./useBooks";

const Books = () => {
    const {
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
        error,
        books,
        loadMore,
        isLoading,
    } = useBooks();
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(
        theme.breakpoints.between("xs", "md")
    );
    return (
        <Box sx={{ width: "100%", overflow: "hidden", position: "relative" }}>
            <Container maxWidth="xl">
                <CustomToolbar
                    language={language}
                    onLanguageChange={setLanguage}
                    seed={seed}
                    onSeedChange={setSeed}
                    likes={likes}
                    onLikesChange={setLikes}
                    rating={rating}
                    onRatingChange={setRating}
                    view={view}
                    onViewChange={setView}
                    generateRandomSeed={generateRandomSeed}
                    books={books}
                />

                {error ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 4,
                        }}>
                        <Typography variant="h6" color="error">
                            {error}
                        </Typography>
                    </Box>
                ) : view === "list" && !isMobileOrTablet ? (
                    <TableBook books={books} onLoadMore={loadMore} />
                ) : (
                    <GalleryBooks books={books} onLoadMore={loadMore} />
                )}

                {isLoading && (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 16,
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 2,
                        }}>
                        <CircularProgress />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Books;
