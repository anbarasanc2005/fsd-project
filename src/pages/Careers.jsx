import React from "react";
import { Box, Container, Grid, Typography, Card, CardActionArea, Chip } from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

export default function Careers() {
  const jobs = [
    { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-time", location: "Remote" },
    { title: "Product Designer", dept: "Design", type: "Full-time", location: "Bengaluru, India" },
    { title: "Customer Success Specialist", dept: "Support", type: "Full-time", location: "Remote" },
    { title: "Marketing Manager", dept: "Marketing", type: "Full-time", location: "Mumbai, India" }
  ];

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>Join Our Team</Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: "auto" }}>
          Help us build the future of e-commerce. We're always looking for passionate people to join Smart Gadgets.
        </Typography>

        <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>Open Positions</Typography>
        <Grid container spacing={3}>
          {jobs.map((job, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card elevation={0} className="hover-lift" sx={{ borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
                <CardActionArea sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>{job.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                        <WorkOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                        {job.dept} &bull; {job.location}
                      </Typography>
                    </Box>
                    <Chip label={job.type} color="primary" size="small" />
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
