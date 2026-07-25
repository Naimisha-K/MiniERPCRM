import { Grid, Typography } from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import StatCard from "../components/StatCard";

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
        sx={{
          fontFamily: '"Sora", sans-serif',
          fontWeight: 700,
          fontSize: 26,
          mb: 0.5,
        }}
      >
        ERP CRM Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's your business overview.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={Inventory2RoundedIcon}
            label="Products"
            value={dashboardData.products}
            accentColor="#1F5D50"
            tintColor="rgba(31,93,80,0.1)"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={PeopleAltRoundedIcon}
            label="Customers"
            value={dashboardData.customers}
            accentColor="#2E6E8E"
            tintColor="rgba(46,110,142,0.1)"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={ReceiptLongRoundedIcon}
            label="Challans"
            value={dashboardData.challans}
            accentColor="#B4842E"
            tintColor="rgba(217,164,65,0.14)"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={WarningAmberRoundedIcon}
            label="Low Stock"
            value={dashboardData.lowStock}
            accentColor="#C0392B"
            tintColor="rgba(192,57,43,0.1)"
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
}
