"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
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
        reviews,
        setReviews,
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
        <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Container maxWidth="xl">
                <CustomToolbar
                    language={language}
                    onLanguageChange={setLanguage}
                    seed={seed}
                    onSeedChange={setSeed}
                    likes={likes}
                    onLikesChange={setLikes}
                    reviews={reviews}
                    onReviewsChange={setReviews}
                    view={view}
                    onViewChange={setView}
                    generateRandomSeed={generateRandomSeed}
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
                    <TableBook
                        books={books}
                        onLoadMore={loadMore}
                        isLoading={isLoading}
                    />
                ) : (
                    <GalleryBooks
                        books={books}
                        onLoadMore={loadMore}
                        isLoading={isLoading}
                    />
                )}
            </Container>
        </Box>
    );
};

export default Books;
