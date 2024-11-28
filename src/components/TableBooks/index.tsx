"use client";
import React, { useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import { Row } from "./Row";
import { BooksProps } from "@/types/books.type";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type Header = {
    label: string;
    align: "left" | "center" | "right";
    width?: string;
};

const headers: Header[] = [
    { label: "#", align: "left", width: "10%" },
    { label: "ISBN", align: "left" },
    { label: "Title", align: "left" },
    { label: "Author", align: "left" },
    { label: "Publisher", align: "left" },
    { label: "Likes", align: "center" },
    { label: "Reviews", align: "center" },
];

interface ExtendedBooksProps extends BooksProps {
    onLoadMore: () => void;
    isLoading: boolean;
}

const TableBook: React.FC<ExtendedBooksProps> = ({
    books,
    onLoadMore,
    isLoading,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useInfiniteScroll(onLoadMore, containerRef);
    return (
        <TableContainer
            ref={containerRef}
            sx={{
                display: { xs: "none", md: "block" },
                maxHeight: "calc(100svh - 150px)",
            }}>
            <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ tableLayout: "fixed" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="10%" />
                        {headers.map((header, index) => (
                            <TableCell
                                key={index}
                                align={header.align}
                                sx={{
                                    fontWeight: "700",
                                    width: header.width || "auto",
                                }}>
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <Row key={book.index} item={book} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableBook;