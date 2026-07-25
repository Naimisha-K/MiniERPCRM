import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            backgroundColor: "background.default",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
