import { Box, styled, type BoxProps } from "@mui/material";


export const FormBox = styled(Box)<BoxProps>({
    width:350,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    gap:20,
    margin:"auto"
});