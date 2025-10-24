import { Paper, styled, type PaperProps } from "@mui/material";

export const CenterPaper = styled(Paper)<PaperProps>(({theme})=>({
    display:"inline-block",
    padding:theme.spacing(3),
    margin:"auto"
}));