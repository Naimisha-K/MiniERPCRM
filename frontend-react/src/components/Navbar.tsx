import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,
      }}
    >
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          Mini ERP CRM
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography sx={{ mr: 2 }}>
          Welcome, {user.name || "Admin"}
        </Typography>

        <Avatar sx={{ mr: 2 }}>
          {user.name
            ? user.name.charAt(0).toUpperCase()
            : "A"}
        </Avatar>

        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  );
}