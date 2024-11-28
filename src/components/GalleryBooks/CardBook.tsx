import React, { useState } from "react";
import {
    Grid2,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    Button,
} from "@mui/material";
import Image from "next/image";
import { Book } from "@/types/books.type";
import { ContentBook } from "../ContentBook";

interface CardBookProps {
    book: Book;
}

const CardBook: React.FC<CardBookProps> = ({ book }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Grid2 key={book.index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
                sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}>
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={400}
                    height={300}
                    layout="responsive"
                />

                <Box
                    sx={{
                        paddingTop: "8px",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}>
                    <Typography component="h4" variant="h5">
                        {book.title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        {book.author}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                            marginBottom: "16px",
                        }}>
                        {book.genre}
                    </Typography>

                    <Button
                        type="button"
                        variant="outlined"
                        sx={{ textTransform: "none" }}
                        onClick={handleOpenDialog}>
                        More Info
                    </Button>

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogContent>
                            <ContentBook item={book} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type="button"
                                sx={{ textTransform: "none" }}
                                onClick={handleCloseDialog}
                                color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Grid2>
    );
};

export default CardBook;
