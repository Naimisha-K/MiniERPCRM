import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import api from "../services/api";

interface Product {
  id: number;
  productName: string;
  sku: string;
  category: string;
  unitPrice: number;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
}

interface Props {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

const initialForm = {
  productName: "",
  sku: "",
  category: "",
  unitPrice: 0,
  currentStock: 0,
  minimumStock: 0,
  warehouse: "",
};

export default function ProductDialog({
  open,
  product,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        sku: product.sku,
        category: product.category,
        unitPrice: product.unitPrice,
        currentStock: product.currentStock,
        minimumStock: product.minimumStock,
        warehouse: product.warehouse,
      });
    } else {
      setFormData(initialForm);
    }
  }, [product, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "unitPrice" ||
        name === "currentStock" ||
        name === "minimumStock"
          ? Number(value)
          : value,
    });
  };

  const handleSave = async () => {
    try {
      if (product) {
        await api.put(`/products/${product.id}`, formData);
        alert("Product Updated Successfully");
      } else {
        await api.post("/products", formData);
        alert("Product Added Successfully");
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
        {product ? "Edit Product" : "Add Product"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Warehouse"
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Unit Price"
              name="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Current Stock"
              name="currentStock"
              type="number"
              value={formData.currentStock}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Minimum Stock"
              name="minimumStock"
              type="number"
              value={formData.minimumStock}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {product ? "Update Product" : "Save Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}