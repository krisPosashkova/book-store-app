import { styled } from "@mui/system";
import { Toolbar } from "@mui/material";
export const StickyToolbar = styled(Toolbar)({
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10,
    marginTop: "1.5rem",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    borderRadius: "1rem",
    justifyContent: "space-between",
});
