import React, { useState } from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { getFaqs } from "../data/mockData";

export default function FAQ() {
  const faqs = getFaqs();
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) || 
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>Frequently Asked Questions</Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Everything you need to know about the product and billing.
        </Typography>

        <Box sx={{ mb: 6, position: "relative" }}>
          <SearchIcon sx={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "text.secondary" }} />
          <TextField 
            fullWidth 
            placeholder="Search for answers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ 
              "& .MuiOutlinedInput-root": { 
                pl: 5, borderRadius: 4, bgcolor: "white", 
                "& fieldset": { borderColor: "rgba(0,0,0,0.1)" } 
              } 
            }}
          />
        </Box>

        <Box>
          {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
            <Accordion key={index} elevation={0} sx={{ mb: 2, borderRadius: "16px !important", "&:before": { display: "none" }, border: "1px solid rgba(0,0,0,0.05)" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
                <Typography variant="subtitle1" fontWeight={700}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3, color: "text.secondary" }}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          )) : (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">No FAQs found matching "{search}"</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
