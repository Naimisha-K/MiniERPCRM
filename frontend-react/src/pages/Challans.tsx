import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

interface Customer {
  id: number;
  customerName: string;
}

interface Product {
  id: number;
  productName: string;
  unitPrice: number;
}

interface Item {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export default function Challans() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customerId, setCustomerId] = useState<number | "">("");
  const [productId, setProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState<Item[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const customerRes = await api.get("/customers");
        const productRes = await api.get("/products");

        setCustomers(customerRes.data);
        setProducts(productRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const addItem = () => {
    if (!productId) {
      alert("Please select a product.");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    if (
      items.some(
        (item) => item.productId === productId
      )
    ) {
      alert("Product already added.");
      return;
    }

    const product = products.find(
      (p) => p.id === productId
    );

    if (!product) return;

    setItems([
      ...items,
      {
        productId: product.id,
        productName: product.productName,
        quantity,
        price: product.unitPrice,
      },
    ]);

    setProductId("");
    setQuantity(1);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const totalQuantity = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.quantity * item.price,
      0
    );
  }, [items]);

  const generateChallan = async () => {
    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    try {
      await api.post("/challans", {
        customerId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      setSnackbarOpen(true);

      setCustomerId("");
      setProductId("");
      setQuantity(1);
      setItems([]);

    } catch (err: unknown) {
  const error = err as {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

  alert(
    error.response?.data?.message ??
      "Failed to generate challan."
  );
}
  };
  return (
  <MainLayout>

    <Typography
      variant="h4"
      gutterBottom
      sx={{ fontWeight: "bold" }}
    >
      Create Sales Challan
    </Typography>

    <Typography
      color="text.secondary"
      sx={{ mb: 3 }}
    >
      Select a customer, add products, and generate a sales challan.
    </Typography>

    <Card
      sx={{
        borderRadius: 4,
      }}
    >
      <CardContent>

        <Stack spacing={3}>

          {/* Customer */}

          <TextField
            select
            fullWidth
            label="Select Customer"
            value={customerId}
            onChange={(e) =>
              setCustomerId(Number(e.target.value))
            }
          >
            {customers.map((customer) => (

              <MenuItem
                key={customer.id}
                value={customer.id}
              >
                {customer.customerName}
              </MenuItem>

            ))}
          </TextField>

          <Divider />

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
          >
            Add Products
          </Typography>

          <Box
  sx={{
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    alignItems: "center",
  }}
>

            <TextField
              select
              label="Product"
              value={productId}
              onChange={(e) =>
                setProductId(Number(e.target.value))
              }
              sx={{
                minWidth: 260,
                flex: 1,
              }}
            >
              {products.map((product) => (

                <MenuItem
                  key={product.id}
                  value={product.id}
                >
                  {product.productName}
                </MenuItem>

              ))}
            </TextField>

            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              sx={{
                width: 150,
              }}
            />

            <Button
              variant="contained"
              startIcon={
                <AddShoppingCartIcon />
              }
              onClick={addItem}
            >
              Add Item
            </Button>

          </Box>

          <Divider />

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
          >
            Challan Items
          </Typography>

          <Paper elevation={2}>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell>
                    Product
                  </TableCell>

                  <TableCell align="center">
                    Qty
                  </TableCell>

                  <TableCell align="right">
                    Price
                  </TableCell>

                  <TableCell align="right">
                    Total
                  </TableCell>

                  <TableCell align="center">
                    Remove
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>
                {items.length === 0 ? (

  <TableRow>

    <TableCell
      colSpan={5}
      align="center"
    >
      No products added.
    </TableCell>

  </TableRow>

) : (

  items.map((item, index) => (

    <TableRow key={index}>

      <TableCell>
        {item.productName}
      </TableCell>

      <TableCell align="center">
        {item.quantity}
      </TableCell>

      <TableCell align="right">
        ₹{item.price.toFixed(2)}
      </TableCell>

      <TableCell align="right">
        ₹{(item.quantity * item.price).toFixed(2)}
      </TableCell>

      <TableCell align="center">

        <IconButton
          color="error"
          onClick={() => removeItem(index)}
        >
          <DeleteIcon />
        </IconButton>

      </TableCell>

    </TableRow>

  ))

)}

              </TableBody>

            </Table>

          </Paper>

          <Divider />

          <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

            <Typography
              variant="h6"
            >
              Total Quantity
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
            >
              {totalQuantity}
            </Typography>

          </Box>

         <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
            <Typography
              variant="h5"
            >
              Grand Total
            </Typography>

            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              ₹{totalAmount.toFixed(2)}
            </Typography>

          </Box>

          <Button
            variant="contained"
            color="success"
            size="large"
            disabled={
              !customerId ||
              items.length === 0
            }
            onClick={generateChallan}
          >
            Generate Challan
          </Button>

        </Stack>

      </CardContent>

    </Card>

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        severity="success"
        onClose={() => setSnackbarOpen(false)}
        sx={{ width: "100%" }}
      >
        Challan Generated Successfully!
      </Alert>
    </Snackbar>

  </MainLayout>
);
}