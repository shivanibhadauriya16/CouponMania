import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Logo from "../../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              px: 0,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="CouponMania"
                style={{ width: 50, height: 50, marginRight: 4 }}
              />
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  marginLeft: 6,
                  color: "#B53471",
                }}
              >
                Coupon Mania
              </div>
            </div>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                href="#"
                variant="text"
                color="info"
                size="small"
                style={{ color: "#B53471" }}
              >
                Home
              </Button>
              <Button
                href="#category"
                variant="text"
                color="info"
                size="small"
                style={{ color: "#B53471" }}
              >
                Category
              </Button>
              <Button
                href="#store"
                variant="text"
                color="info"
                size="small"
                style={{ color: "#B53471" }}
              >
                Top Store
              </Button>
              <Button
                href="#review"
                variant="text"
                color="info"
                size="small"
                style={{ color: "#B53471" }}
              >
                Customer Review
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0, color: "#B53471" }}
                href="#faq"
              >
                FAQ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0, color: "#B53471" }}
                href="#about"
              >
                About
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="text"
                size="small"
                onClick={() => navigate("/loginpage")}
                style={{ color: "#B53471" }}
              >
                Admin Login
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem href="#">Home</MenuItem>
                <MenuItem href="#category">Category</MenuItem>
                <MenuItem href="#store">Top Store</MenuItem>
                <MenuItem href="#review">Customer Review</MenuItem>
                <MenuItem href="#faq">FAQ</MenuItem>
                <MenuItem href="#about">About</MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
