/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

const BrandLogo = ({ size = "md", inverted = false }) => {
  const compact = size === "sm";

  return (
    <Box
      sx={{
        alignItems: "center",
        color: inverted ? "#FFFFFF" : "#0F172A",
        display: "inline-flex",
        gap: compact ? 0.9 : 1.2,
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          bgcolor: inverted ? "rgba(255,255,255,0.14)" : "#EAF5EE",
          border: `1px solid ${inverted ? "rgba(255,255,255,0.18)" : "#CFE8D7"}`,
          borderRadius: "8px",
          color: inverted ? "#9ED96A" : "#2E7D5B",
          display: "flex",
          height: compact ? 34 : 44,
          justifyContent: "center",
          width: compact ? 34 : 44,
        }}
      >
        <BoltIcon fontSize={compact ? "small" : "medium"} />
      </Box>
      <Box>
        <Typography
          component="span"
          sx={{
            display: "block",
            fontSize: compact ? "1rem" : "1.35rem",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          VoltGrid
        </Typography>
        {!compact && (
          <Typography
            component="span"
            sx={{
              color: inverted ? "rgba(255,255,255,0.68)" : "#64748B",
              display: "block",
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              lineHeight: 1.4,
              textTransform: "uppercase",
            }}
          >
            EV Charging OS
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BrandLogo;
