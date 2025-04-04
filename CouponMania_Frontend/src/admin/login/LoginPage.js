import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Logo from "../../assets/Logo.png"
import { postData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginbg from "../../assets/loginbg.jpg"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function LoginPage(props) {
  const navigate = useNavigate();
  const [emailid, setEmailid] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    var response = await postData("adminlogin/check_admin", { emailid, password });
    console.log(response.status, "asdfg");
    if (response.status) {
      localStorage.setItem("ADMIN",JSON.stringify(response.data))
      navigate("/dashboardadmin");
    } else {
      Swal.fire({
        icon: "error",
        text: response.message,
        toast: true,
      });

    }
  };

  return (
    <div >
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="Logo" width={"15%"} />

            <div style={{ fontWeight: 700, fontSize: 24,marginLeft: 6 }}>Coupon_mania</div>
          </div>

          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(1rem, 8vw, 1.50rem)" }}
          >
            Admin Sign in
          </Typography>
          <Box
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email/Mobile No.</FormLabel>
              <TextField
                type="email"
                onChange={(e) => setEmailid(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>

            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>
              <TextField
                placeholder="••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}
