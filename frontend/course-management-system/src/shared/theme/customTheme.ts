import { createTheme } from "@mui/material";

declare module "@mui/material/styles"
{
    interface Palette {
        primaryButton : Palette["primary"];
    }

    interface PaletteOptions{
        primaryButton? : PaletteOptions["primary"];
    }
}

declare module "@mui/material/Button"
{
    interface ButtonPropsColorOverrides
    {
        primaryButton : true;
    }
}

export const customTheme = createTheme({
    palette:{
        primary:{
            main:"#0c049eff",
        },
        primaryButton:{
            main:"#0c049eff",
            contrastText:"#ffff"
        }
    }
})