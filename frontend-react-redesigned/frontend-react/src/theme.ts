import { createTheme } from "@mui/material/styles";

// ---------------------------------------------------------------------------
// "Ledger" theme — built for a warehouse/distribution ops tool, not a generic
// admin template. Deep ledger-green for trust + control, warm amber for
// stock/attention states, warm paper background instead of stark white/grey.
// ---------------------------------------------------------------------------

declare module "@mui/material/styles" {
  interface Palette {
    sidebar: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      text: string;
      mutedText: string;
      activeIndicator: string;
    };
  }
  interface PaletteOptions {
    sidebar?: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      text: string;
      mutedText: string;
      activeIndicator: string;
    };
  }
}

const ledgerGreen = {
  50: "#EAF2EF",
  100: "#CFE2DB",
  400: "#3D7C6E",
  600: "#1F5D50",
  700: "#194B41",
  900: "#123D35",
};

const amber = {
  400: "#E3B15E",
  600: "#D9A441",
  700: "#B4842E",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: ledgerGreen[600],
      light: ledgerGreen[400],
      dark: ledgerGreen[900],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: amber[600],
      light: amber[400],
      dark: amber[700],
      contrastText: "#1B1F1E",
    },
    success: {
      main: "#2E7D53",
    },
    warning: {
      main: amber[600],
    },
    error: {
      main: "#C0392B",
    },
    info: {
      main: "#2E6E8E",
    },
    background: {
      default: "#F5F4F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1B1F1E",
      secondary: "#5C6663",
    },
    divider: "#E4E1D8",
    sidebar: {
      background: "#14211D",
      hoverBackground: "rgba(255,255,255,0.06)",
      activeBackground: "rgba(217,164,65,0.14)",
      text: "rgba(255,255,255,0.82)",
      mutedText: "rgba(255,255,255,0.5)",
      activeIndicator: amber[600],
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", system-ui, "Segoe UI", sans-serif',
    h1: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Sora", sans-serif', fontWeight: 700, letterSpacing: -0.3 },
    h5: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F4F0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid #E4E1D8",
          boxShadow: "0 1px 2px rgba(20, 33, 29, 0.04)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
        outlined: {
          border: "1px solid #E4E1D8",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1B1F1E",
          boxShadow: "none",
          borderBottom: "1px solid #E4E1D8",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#14211D",
          borderRight: "none",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            color: "#5C6663",
            backgroundColor: "#F5F4F0",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(31, 93, 80, 0.04)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: '"Sora", sans-serif',
          fontWeight: 700,
          fontSize: 18,
          padding: "20px 24px",
          borderBottom: "1px solid #E4E1D8",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
          borderTop: "1px solid #E4E1D8",
        },
      },
    },
  },
});

export default theme;
