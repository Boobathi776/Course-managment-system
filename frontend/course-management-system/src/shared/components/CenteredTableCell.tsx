import { styled, TableCell } from "@mui/material";

export const CenteredTableCell = styled(TableCell)({
    textAlign:"center",
});

export const CenteredTableCellHeading = styled(TableCell)(({theme})=>({
    textAlign: "center",
    fontSize: "1.3rem",
    backgroundColor: theme.palette.secondaryColor.main,
    color : theme.palette.secondaryColor.contrastText
}));
