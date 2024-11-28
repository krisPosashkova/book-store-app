import React, { useState } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
    Slider,
    Drawer,
    Button,
    Box,
} from "@mui/material";
import { Shuffle, ViewList, ViewModule, FilterList } from "@mui/icons-material";
import { StickyToolbar } from "./toolbar.styled";
import { ToolbarProps as CustomToolbarProps } from "@/types/components/toolbar.type";

const languages = [
    { value: "en", label: "English" },
    { value: "pl", label: "Polish" },
    { value: "pt_BR", label: "Portuguese (Brazil)" },
];

const CustomToolbar: React.FC<CustomToolbarProps> = ({
    language,
    onLanguageChange,
    seed,
    generateRandomSeed,
    onSeedChange,
    likes,
    onLikesChange,
    reviews,
    onReviewsChange,
    view,
    onViewChange,
}) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    const Filters = (
        <>
            <FormControl
                variant="outlined"
                sx={{ width: { xs: "100%", md: "20%" } }}>
                <InputLabel>Language</InputLabel>
                <Select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    label="Language">
                    {languages.map((lang) => (
                        <MenuItem key={lang.value} value={lang.value}>
                            {lang.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                id="input-with-icon-textfield"
                label="Seed"
                sx={{ width: { xs: "100%", md: "20%" } }}
                value={seed}
                onChange={(e) => onSeedChange(Number(e.target.value))}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton onClick={generateRandomSeed}>
                                <Shuffle />
                            </IconButton>
                        ),
                    },
                }}
                variant="outlined"
            />

            <FormControl
                variant="filled"
                sx={{ width: { xs: "100%", md: "20%" } }}>
                <Typography id="slider-label" gutterBottom>
                    Likes
                </Typography>
                <Slider
                    aria-labelledby="slider-label"
                    value={likes}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(_, newValue) =>
                        onLikesChange(newValue as number)
                    }
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => value.toFixed(1)}
                />
            </FormControl>

            <TextField
                sx={{ width: { xs: "100%", md: "20%" } }}
                id="number-input-field"
                label="Reviews"
                type="number"
                value={reviews}
                onChange={(e) => onReviewsChange(Number(e.target.value))}
                slotProps={{
                    input: {
                        inputProps: {
                            step: 0.1,
                            min: 0,
                            max: 5,
                        },
                    },
                }}
                variant="outlined"
            />
        </>
    );

    return (
        <StickyToolbar>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={handleDrawerToggle}>
                    Filters
                </Button>
            </Box>

            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 1,
                }}>
                {Filters}
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(_, newValue) => onViewChange(newValue)}>
                    <ToggleButton value="list" aria-label="list">
                        <ViewList />
                    </ToggleButton>
                    <ToggleButton value="module" aria-label="module">
                        <ViewModule />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}>
                <Box sx={{ width: 300, padding: 2 }}>
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            flexDirection: "column",
                            gap: 4,
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                        {Filters}
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleDrawerToggle}
                        sx={{ mt: 2 }}>
                        Apply
                    </Button>
                </Box>
            </Drawer>
        </StickyToolbar>
    );
};

export default CustomToolbar;