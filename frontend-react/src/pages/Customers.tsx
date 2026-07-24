import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import CustomerDialog from "../components/CustomerDialog";

interface Customer {
  id: number;
  customerName: string;
  mobile: string;
  businessName: string;
  customerType: string;
  status: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
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

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleAdd}
      >
        Add Customer
      </Button>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Business</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell>{customer.mobile}</TableCell>
                  <TableCell>{customer.businessName}</TableCell>
                  <TableCell>{customer.customerType}</TableCell>
                  <TableCell>{customer.status}</TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
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