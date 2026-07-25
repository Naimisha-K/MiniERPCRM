import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const highlights = [
  {
    icon: PeopleAltRoundedIcon,
    title: "Customer follow-ups, never missed",
    text: "Track leads, active accounts, and follow-up dates in one CRM view.",
  },
  {
    icon: Inventory2RoundedIcon,
    title: "Stock levels you can trust",
    text: "Every movement is logged, so counts stay accurate across warehouses.",
  },
  {
    icon: ReceiptLongRoundedIcon,
    title: "Challans generated in seconds",
    text: "Confirm an order and stock, pricing, and totals update automatically.",
  },
];

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Login Failed");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "background.default",
      }}
    >
      {/* Brand panel */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          width: "44%",
          minWidth: 420,
          p: 6,
          backgroundColor: "#14211D",
          color: "#fff",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(217,164,65,0.14), transparent 45%)",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          Mini<span style={{ color: "#D9A441" }}>ERP</span>
        </Typography>

        <Box>
          <Typography
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              fontSize: 34,
              lineHeight: 1.2,
              mb: 1.5,
            }}
          >
            One portal for sales,
            <br />
            warehouse, and accounts.
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4, fontSize: 15 }}>
            Built for wholesale and distribution teams who need customers,
            stock, and challans to stay in sync.
          </Typography>

          <Stack spacing={3}>
            {highlights.map(({ icon: Icon, title, text }) => (
              <Stack key={title} direction="row" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(217,164,65,0.14)",
                    color: "#D9A441",
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>
                    {title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13.5 }}>
                    {text}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: 12.5 }}>
          Internal operations tool — Admin · Sales · Warehouse · Accounts
        </Typography>
      </Box>

      {/* Form panel */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 380 }}>
          <Typography
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              fontSize: 26,
              mb: 0.5,
            }}
          >
            Sign in
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 4, fontSize: 14.5 }}>
            Enter your credentials to reach your dashboard.
          </Typography>

          <Stack spacing={2.5}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineRoundedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              sx={{ py: 1.3, fontSize: 15 }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </Stack>

          <Typography
            sx={{ mt: 4, fontSize: 12.5, color: "text.secondary", textAlign: "center" }}
          >
            Ask an admin for access if you don't have credentials yet.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
