import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Chip,
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

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import StockDialog from "../components/StockDialog";
import PageHeader from "../components/PageHeader";

interface Product {
  id: number;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
}

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [movementType, setMovementType] = useState<"IN" | "OUT">("IN");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadInventory = async () => {
    try {
      const res = await api.get("/inventory");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <PageHeader
        icon={WarehouseRoundedIcon}
        title="Inventory"
        subtitle="Track stock levels and log movements across warehouses"
      />

      <TextField
        placeholder="Search product"
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
                <TableCell align="right">Current</TableCell>
                <TableCell align="right">Minimum</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 5, color: "text.secondary" }}>
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  let status;

                  if (product.currentStock === 0) {
                    status = <Chip label="Out of Stock" color="error" size="small" />;
                  } else if (product.currentStock <= product.minimumStock) {
                    status = <Chip label="Low Stock" color="warning" size="small" />;
                  } else {
                    status = <Chip label="In Stock" color="success" size="small" />;
                  }

                  return (
                    <TableRow key={product.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{product.productName}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        {product.currentStock}
                      </TableCell>
                      <TableCell align="right">{product.minimumStock}</TableCell>
                      <TableCell>{product.warehouse}</TableCell>
                      <TableCell>{status}</TableCell>

                      <TableCell align="center">
                        <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            startIcon={<ArrowUpwardRoundedIcon fontSize="small" />}
                            onClick={() => {
                              setSelectedProduct(product);
                              setMovementType("IN");
                              setDialogOpen(true);
                            }}
                          >
                            Stock In
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<ArrowDownwardRoundedIcon fontSize="small" />}
                            onClick={() => {
                              setSelectedProduct(product);
                              setMovementType("OUT");
                              setDialogOpen(true);
                            }}
                          >
                            Stock Out
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <StockDialog
        open={dialogOpen}
        type={movementType}
        product={selectedProduct}
        onClose={() => {
          setDialogOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={() => {
          loadInventory();
          setDialogOpen(false);
          setSelectedProduct(null);
        }}
      />
    </MainLayout>
  );
}
