import { Box, Card, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface Props {
  icon: SvgIconComponent;
  label: string;
  value: number | string;
  accentColor: string;
  tintColor: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  accentColor,
  tintColor,
}: Props) {
  return (
    <Card
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderTop: `3px solid ${accentColor}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 24px rgba(20, 33, 29, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          flexShrink: 0,
          borderRadius: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tintColor,
          color: accentColor,
        }}
      >
        <Icon fontSize="medium" />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Card>
  );
}
