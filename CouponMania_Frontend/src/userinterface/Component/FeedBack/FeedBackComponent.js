import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/system";
import Rating from "@mui/material/Rating";
import { Paper } from "@mui/material";

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    rating: <Rating value={5} readOnly />,
    name: "Remy Sharp",
    review:
      "Thank You, Coupon Mania, for providing a cashback of ₹1549 on the Dell laptop order. I must say you are truly a genuine cashback website. This review is from the heart. You rock!",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    rating: <Rating value={5} readOnly />,
    name: "Travis Howard",
    review:
      "I received ₹879 cashback on my recent Flipkart shopping through Coupon Mania. The process was smooth, and the cashback was credited on time. Highly recommended!",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    rating: <Rating value={5} readOnly />,
    name: "Cindy Baker",
    review:
      "A big shoutout to Coupon Mania! I saved ₹2050 on my latest mobile purchase. The cashback tracking was flawless, and the payout was quick. Love this platform!",
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
    rating: <Rating value={5} readOnly />,
    name: "Julia Stewart",
    review:
      "Coupon Mania is a lifesaver! I got ₹450 cashback on my Myntra order. The best part? No hidden conditions. Just pure savings!",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
    rating: <Rating value={5} readOnly />,
    name: "John Smith",
    review:
      "₹1200 cashback on my Amazon order! Thank you, Coupon Mania, for being a reliable and rewarding cashback platform. Can't wait to shop more!",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
    rating: <Rating value={5} readOnly />,
    name: "Daniel Wolf",
    review:
      "This website is amazing! I got ₹980 cashback on my hotel booking. Everything worked perfectly, and the support team was super helpful. Highly trusted!",
  },
];

export default function FeedBackComponent() {
  const theme = useTheme();

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "#B53471" }}
        >
          Hear It From Our Customers
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Real Savings, Real Reviews! See how our users are earning cashback on
          their purchases with Coupon Mania.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card variant="outlined">
              <Paper
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
                elevation={3}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    {testimonial.review}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 2,
                    width: "50%",
                  }}
                >
                  {testimonial.avatar}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: 13,
                    }}
                  >
                    {testimonial.name}
                    {testimonial.rating}
                  </div>
                </Box>
              </Paper>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
