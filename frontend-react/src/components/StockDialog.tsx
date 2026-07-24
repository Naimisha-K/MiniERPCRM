import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import api from "../services/api";

interface Product {
  id: number;
  productName: string;
}

interface Props {
  open: boolean;
  type: "IN" | "OUT";
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function StockDialog({
  open,
  type,
  product,
  onClose,
  onSuccess,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setReason("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!product) return;

    try {
      const payload = {
        productId: product.id,
        quantity,
        reason,
      };

      if (type === "IN") {
        await api.post("/inventory/in", payload);
        alert("Stock added successfully");
      } else {
        await api.post("/inventory/out", payload);
        alert("Stock removed successfully");
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Inventory operation failed");
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
        {type === "IN" ? "Stock In" : "Stock Out"}
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Product: <strong>{product?.productName}</strong>
        </Typography>

        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Reason"
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          fullWidth
          multiline
          rows={3}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color={type === "IN" ? "success" : "error"}
          onClick={handleSubmit}
        >
          {type === "IN" ? "Stock In" : "Stock Out"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}