import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import StockDialog from "../components/StockDialog";

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

  const [movementType, setMovementType] =
    useState<"IN" | "OUT">("IN");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

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
    p.productName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>

      <TextField
        label="Search Product"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{ mb: 2 }}
        fullWidth
      />

      <Card>

        <CardContent>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>Product</TableCell>

                <TableCell>SKU</TableCell>

                <TableCell>Category</TableCell>

                <TableCell>Current</TableCell>

                <TableCell>Minimum</TableCell>

                <TableCell>Warehouse</TableCell>

                <TableCell>Status</TableCell>

                <TableCell align="center">
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filteredProducts.map((product) => {

                let status;

                if (product.currentStock === 0) {

                  status = (
                    <Chip
                      label="Out of Stock"
                      color="error"
                    />
                  );

                } else if (
                  product.currentStock <=
                  product.minimumStock
                ) {

                  status = (
                    <Chip
                      label="Low Stock"
                      color="warning"
                    />
                  );

                } else {

                  status = (
                    <Chip
                      label="In Stock"
                      color="success"
                    />
                  );

                }

                return (

                  <TableRow key={product.id}>

                    <TableCell>
                      {product.productName}
                    </TableCell>

                    <TableCell>
                      {product.sku}
                    </TableCell>

                    <TableCell>
                      {product.category}
                    </TableCell>

                    <TableCell>
                      {product.currentStock}
                    </TableCell>

                    <TableCell>
                      {product.minimumStock}
                    </TableCell>

                    <TableCell>
                      {product.warehouse}
                    </TableCell>

                    <TableCell>
                      {status}
                    </TableCell>

                    <TableCell align="center">

                      <Stack
                        direction="row"
                        spacing={1}
                      >

                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            setSelectedProduct(product);
                            setMovementType("IN");
                            setDialogOpen(true);
                          }}
                        >
                          Stock In
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
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

              })}

            </TableBody>

          </Table>

        </CardContent>

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