import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = (user.role || "Admin") as string;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ top: 0 }}>
      <Toolbar sx={{ minHeight: 64, gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
            Welcome back,{" "}
            <Typography component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              {user.name || "Admin"}
            </Typography>
          </Typography>
        </Box>

        <Chip
          label={role}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            backgroundColor: "rgba(31,93,80,0.1)",
            color: "primary.dark",
          }}
        />

        <Avatar
          sx={{
            width: 34,
            height: 34,
            fontSize: 14,
            fontWeight: 700,
            bgcolor: "primary.main",
          }}
        >
          {user.name ? user.name.charAt(0).toUpperCase() : "A"}
        </Avatar>

        <Button
          color="inherit"
          size="small"
          startIcon={<LogoutRoundedIcon fontSize="small" />}
          onClick={handleLogout}
          sx={{ color: "text.secondary" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
