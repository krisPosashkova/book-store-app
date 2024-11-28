import React from "react";
import { Box, Typography, Card, CardContent, Rating } from "@mui/material";
import { BookItemProps } from "@/types/books.type";
export function ContentBook({ item }: BookItemProps) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom component="h4">
                {item.title}
            </Typography>

            <Typography sx={{ mt: 2 }}>
                <strong>Genre:</strong> {item.genre}
            </Typography>
            <Typography mt={2}>
                <strong>Author:</strong> {item.author}
            </Typography>
            <Typography mt={2}>
                <strong>Publisher:</strong> {item.publisher}
            </Typography>
            <Typography mt={2}>
                <strong>Likes:</strong> {item.likes}
            </Typography>
            <Typography mt={2}>
                <strong>Reviews:</strong>
            </Typography>
            <Box sx={{ marginTop: 2 }}>
                {item.reviews.length > 0 ? (
                    item.reviews.map((review, index) => (
                        <Card
                            key={index}
                            sx={{
                                marginBottom: 2,
                                borderRadius: 2,
                                boxShadow: 3,
                            }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold">
                                        {review.author}
                                    </Typography>
                                    <Rating
                                        value={review.rating}
                                        readOnly
                                        sx={{
                                            color: "#fbc02d",
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{ marginTop: 1 }}>
                                    {review.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        There are no reviews
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
