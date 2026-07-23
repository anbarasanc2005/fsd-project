import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";

export default function SectionHeader({ title, subtitle, actionText, actionLink }) {
  return (
    <Stack 
      direction={{ xs: "column", sm: "row" }} 
      justifyContent="space-between" 
      alignItems={{ sm: "flex-end" }} 
      spacing={2} 
      sx={{ mb: 4, width: "100%" }}
    >
      <Box>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 1, letterSpacing: "-0.02em" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 600 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      
      {actionText && actionLink && (
        <Button 
          component={RouterLink} 
          to={actionLink} 
          endIcon={<ArrowForwardIcon />} 
          sx={{ fontWeight: 600, color: "text.primary", "&:hover": { color: "primary.main", bgcolor: "transparent", transform: "translateX(4px)" }, transition: "all 0.2s" }}
          disableRipple
        >
          {actionText}
        </Button>
      )}
    </Stack>
  );
}
