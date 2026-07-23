import React from "react";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export default function BreadcrumbsNav({ items }) {
  return (
    <Box sx={{ py: 2, mb: 2 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" sx={{ color: "text.disabled" }} />} 
        aria-label="breadcrumb"
      >
        <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', color: '#64748b', transition: 'color 0.2s' }}>
          <HomeRoundedIcon sx={{ mr: 0.5, fontSize: 18 }} />
          <Typography variant="body2" fontWeight={600} sx={{ "&:hover": { color: "primary.main" } }}>
            Home
          </Typography>
        </RouterLink>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return isLast ? (
            <Typography key={item.label} variant="body2" color="text.primary" fontWeight={700}>
              {item.label}
            </Typography>
          ) : (
            <RouterLink key={item.label} to={item.to} style={{ color: '#64748b', transition: 'color 0.2s' }}>
              <Typography variant="body2" fontWeight={600} sx={{ "&:hover": { color: "primary.main" } }}>
                {item.label}
              </Typography>
            </RouterLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
