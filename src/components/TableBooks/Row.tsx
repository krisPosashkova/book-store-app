import React from "react";
import { TableRow, TableCell, IconButton, Collapse, Box } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import Image from "next/image";
import { ContentBook } from "../ContentBook";

import { BookItemProps } from "@/types/books.type";

export function Row({ item }: BookItemProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    {item.index}
                </TableCell>
                <TableCell>{item.isbn}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.publisher}</TableCell>
                <TableCell align="center">{item.likes}</TableCell>
                <TableCell align="center">{item.rating}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 3, display: "flex", gap: 4 }}>
                            <Box
                                sx={{
                                    width: "70%",
                                    overflow: "hidden",
                                    borderRadius: 2,
                                    height: "max-content",
                                }}>
                                <Image
                                    src={item.coverImage}
                                    alt={item.title}
                                    width={400}
                                    height={300}
                                    layout="responsive"
                                />
                            </Box>

                            <ContentBook item={item} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
