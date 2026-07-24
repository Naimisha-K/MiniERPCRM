import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WarningIcon from "@mui/icons-material/Warning";

import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    customers: 0,
    products: 0,
    challans: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <MainLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        ERP CRM Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Welcome back! Here's your business overview.
      </Typography>

      <Grid container spacing={3}>
        {/* Products */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              transition: "0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 4,
              }}
            >
              <InventoryIcon
                color="primary"
                sx={{
                  fontSize: 55,
                  mb: 1,
                }}
              />

              <Typography variant="h6">
                Products
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontWeight: "bold" }}
              >
                {dashboardData.products}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Customers */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              transition: "0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 4,
              }}
            >
              <PeopleIcon
                color="success"
                sx={{
                  fontSize: 55,
                  mb: 1,
                }}
              />

              <Typography variant="h6">
                Customers
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontWeight: "bold" }}
              >
                {dashboardData.customers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Challans */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              transition: "0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 4,
              }}
            >
              <ReceiptIcon
                color="secondary"
                sx={{
                  fontSize: 55,
                  mb: 1,
                }}
              />

              <Typography variant="h6">
                Challans
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontWeight: "bold" }}
              >
                {dashboardData.challans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Low Stock */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card
            sx={{
              borderRadius: 4,
              transition: "0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 4,
              }}
            >
              <WarningIcon
                color="error"
                sx={{
                  fontSize: 55,
                  mb: 1,
                }}
              />

              <Typography variant="h6">
                Low Stock
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontWeight: "bold" }}
              >
                {dashboardData.lowStock}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}