import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: DashboardRoundedIcon },
  { label: "Customers", path: "/customers", icon: PeopleAltRoundedIcon },
  { label: "Products", path: "/products", icon: Inventory2RoundedIcon },
  { label: "Inventory", path: "/inventory", icon: WarehouseRoundedIcon },
  { label: "Challans", path: "/challans", icon: ReceiptLongRoundedIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 3,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            fontSize: 18,
            color: "#fff",
            letterSpacing: -0.2,
          }}
        >
          Mini<span style={{ color: "#D9A441" }}>ERP</span>
        </Typography>
      </Box>

      <Typography
        sx={{
          px: 3,
          pt: 2.5,
          pb: 1,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Operations
      </Typography>

      <List sx={{ px: 1.5 }}>
        {navItems.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path;

          return (
            <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={path}
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  color: active ? "#fff" : "rgba(255,255,255,0.75)",
                  backgroundColor: active
                    ? "rgba(217,164,65,0.14)"
                    : "transparent",
                  borderLeft: active
                    ? "3px solid #D9A441"
                    : "3px solid transparent",
                  "&:hover": {
                    backgroundColor: active
                      ? "rgba(217,164,65,0.18)"
                      : "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? "#D9A441" : "rgba(255,255,255,0.55)",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 14,
                        fontWeight: active ? 600 : 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
