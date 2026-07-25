import { Box, Button, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface Props {
  icon: SvgIconComponent;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: SvgIconComponent;
}

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  actionIcon: ActionIcon,
}: Props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        mb: 3,
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(31,93,80,0.08)",
            color: "primary.main",
          }}
        >
          <Icon fontSize="small" />
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              fontSize: 22,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ color: "text.secondary", fontSize: 13.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          startIcon={ActionIcon ? <ActionIcon /> : undefined}
        >
          {actionLabel}
        </Button>
      )}
    </Stack>
  );
}
