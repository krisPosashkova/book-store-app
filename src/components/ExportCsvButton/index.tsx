import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Papa from "papaparse";
import { Book } from "@/types/books.type";

import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

interface ExportCsvButtonProps {
    books: Book[];
}

const ExportCsvButton: React.FC<ExportCsvButtonProps> = ({ books }) => {
    const exportToCSV = () => {
        if (!books.length) {
            alert("There is no data to export.");
            return;
        }

        const processedBooks = books.map((book) => ({
            index: book.index,
            isbn: book.isbn,
            title: book.title,
            genre: book.genre,
            author: book.author,
            publisher: book.publisher,
            likes: book.likes,
            rating: book.rating,
            reviews: JSON.stringify(book.reviews),
            coverImage: book.coverImage,
        }));

        const csv = Papa.unparse(processedBooks, {
            header: true,
        });

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", "books.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Tooltip title="Export to CSV">
            <IconButton onClick={exportToCSV}>
                <DownloadForOfflineIcon
                    sx={{
                        width: "40px",
                        height: "40px",
                        fill: "#5356fcf0",
                    }}
                />
            </IconButton>
        </Tooltip>
    );
};

export default ExportCsvButton;
