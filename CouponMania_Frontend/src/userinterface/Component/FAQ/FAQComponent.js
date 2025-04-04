import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function FAQComponen() {
  const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const faqs = [
    {
      question: "What is Couponmania?",
      answer:
        "Couponmania is an online platform that provides exclusive coupons, discounts, and cashback offers across various categories like shopping, travel, food, and more.",
    },
    {
      question: "How do I use a coupon from Couponmania?",
      answer:
        "Simply browse through available coupons, click on your desired offer, and copy the promo code. Apply it at checkout on the respective store's website.",
    },
    {
      question: "Are the coupons on Couponmania free?",
      answer:
        "Yes! All coupons listed on Couponmania are free to use. Just select a deal and enjoy the savings.",
    },
    {
      question: "How often are new coupons added?",
      answer:
        "We update our coupon list daily to ensure you get the latest discounts and offers.",
    },
    {
      question: "Can I get cashback with Couponmania?",
      answer:
        "Yes! Many of our offers include cashback rewards. Simply follow the instructions on the offer page.",
    },
  ];
  

  const fqaData = () => {
    return (
      <Container
        style={{
          width: "100%",
          padding: matches?10:"20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Frequently Asked Questions (FAQs)
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography component="span" variant="subtitle2">
              {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: "100%", md: "70%",color: "#b12a5b"} }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    );
  };

  return (
    <Container
      id="faq"
      sx={{
      }}
    >
      <Box sx={{ width: "100%" }}>
        {fqaData()}
      </Box>
    </Container>
  );
}
