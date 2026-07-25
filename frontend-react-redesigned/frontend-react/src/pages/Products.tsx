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

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import ProductDialog from "../components/ProductDialog";
import PageHeader from "../components/PageHeader";

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const filtered = products.filter((p) =>
    `${p.productName} ${p.sku} ${p.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <PageHeader
        icon={Inventory2RoundedIcon}
        title="Products"
        subtitle="Manage your product catalog and pricing"
        actionLabel="Add Product"
        actionIcon={AddRoundedIcon}
        onAction={handleAdd}
      />

      <TextField
        placeholder="Search by name, SKU, or category"
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
                <TableCell>Product</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Min Stock</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 5, color: "text.secondary" }}>
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {product.productName}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.sku}
                        size="small"
                        variant="outlined"
                        sx={{ fontFamily: "ui-monospace, monospace", fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">₹{product.unitPrice}</TableCell>
                    <TableCell align="right">{product.currentStock}</TableCell>
                    <TableCell align="right">{product.minimumStock}</TableCell>
                    <TableCell>{product.warehouse}</TableCell>

                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(product)}
                          sx={{ color: "text.secondary" }}
                        >
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(product.id)}
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

      <ProductDialog
        open={openDialog}
        product={selectedProduct}
        onClose={() => {
          setOpenDialog(false);
          setSelectedProduct(null);
        }}
        onSuccess={() => {
          loadProducts();
          setOpenDialog(false);
          setSelectedProduct(null);
        }}
      />
    </MainLayout>
  );
}
