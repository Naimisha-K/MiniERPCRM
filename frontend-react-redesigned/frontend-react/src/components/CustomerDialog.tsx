import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import api from "../services/api";

interface Customer {
  id: number;
  customerName: string;
  mobile: string;
  email?: string;
  businessName: string;
  gstNumber?: string;
  customerType: string;
  address?: string;
  status: string;
  notes?: string;
}

interface Props {
  open: boolean;
  customer?: Customer | null;
  onClose: () => void;
  onSuccess: () => void;
}

const initialForm = {
  customerName: "",
  mobile: "",
  email: "",
  businessName: "",
  gstNumber: "",
  customerType: "RETAIL",
  address: "",
  status: "ACTIVE",
  notes: "",
};

export default function CustomerDialog({
  open,
  customer,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.customerName || "",
        mobile: customer.mobile || "",
        email: customer.email || "",
        businessName: customer.businessName || "",
        gstNumber: customer.gstNumber || "",
        customerType: customer.customerType || "RETAIL",
        address: customer.address || "",
        status: customer.status || "ACTIVE",
        notes: customer.notes || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [customer, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (customer) {
        await api.put(`/customers/${customer.id}`, formData);
        alert("Customer Updated Successfully");
      } else {
        await api.post("/customers", formData);
        alert("Customer Added Successfully");
      }

      setFormData(initialForm);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Operation Failed");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {customer ? "Edit Customer" : "Add Customer"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="GST Number"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Customer Type"
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="RETAIL">Retail</MenuItem>
              <MenuItem value="WHOLESALE">Wholesale</MenuItem>
              <MenuItem value="DISTRIBUTOR">Distributor</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="LEAD">Lead</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid size={12}>
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {customer ? "Update Customer" : "Save Customer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}