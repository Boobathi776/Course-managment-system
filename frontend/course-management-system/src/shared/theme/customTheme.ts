import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    primaryButton: Palette["primary"];
    secondaryColor: Palette["primary"];
  }

  interface PaletteOptions {
    primaryButton?: PaletteOptions["primary"];
    secondaryColor: Palette["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryButton: true;
    secondaryColor: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    secondaryColor: true;
  }
}

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#5701c7ff",
    },
    primaryButton: {
      main: "#0c049eff",
      contrastText: "#ffff",
    },
    secondaryColor: {
      main: "#5406c1ff",
      contrastText: "#ffff",
      light: "#990ddbff",
      dark: "#9e08deff",
    },
  },
});
