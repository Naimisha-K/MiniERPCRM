import { useEffect, useState } from "react";
import {
  Card,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
} from "@mui/material";

import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import CustomerDialog from "../components/CustomerDialog";
import PageHeader from "../components/PageHeader";

interface Customer {
  id: number;
  customerName: string;
  mobile: string;
  businessName: string;
  customerType: string;
  status: string;
}

const statusColor: Record<string, "success" | "warning" | "default"> = {
  ACTIVE: "success",
  LEAD: "warning",
  INACTIVE: "default",
};

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpenDialog(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/customers/${id}`);
      loadCustomers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete customer");
    }
  };

  const filtered = customers.filter((c) =>
    `${c.customerName} ${c.businessName} ${c.mobile}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <PageHeader
        icon={PeopleAltRoundedIcon}
        title="Customers"
        subtitle="Manage leads, accounts, and follow-ups"
        actionLabel="Add Customer"
        actionIcon={PersonAddAlt1RoundedIcon}
        onAction={handleAdd}
      />

      <TextField
        placeholder="Search by name, business, or mobile"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, width: { xs: "100%", sm: 340 }, backgroundColor: "background.paper" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Business</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5, color: "text.secondary" }}>
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {customer.customerName}
                    </TableCell>
                    <TableCell>{customer.mobile}</TableCell>
                    <TableCell>{customer.businessName}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {customer.customerType?.toLowerCase()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.status}
                        size="small"
                        color={statusColor[customer.status] ?? "default"}
                        variant={customer.status === "INACTIVE" ? "outlined" : "filled"}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(customer)}
                          sx={{ color: "text.secondary" }}
                        >
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <CustomerDialog
        open={openDialog}
        customer={selectedCustomer}
        onClose={() => {
          setOpenDialog(false);
          setSelectedCustomer(null);
        }}
        onSuccess={() => {
          loadCustomers();
          setOpenDialog(false);
          setSelectedCustomer(null);
        }}
      />
    </MainLayout>
  );
}
