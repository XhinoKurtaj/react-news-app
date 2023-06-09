import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import API from "../../config/axiosConfig";
import { Pages } from "./consts/items";
import LoadingButton from "@mui/lab/LoadingButton";

function Navbar() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/newsapi");
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await API.get("auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#052962" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {Pages.map((page) => {
              return (
                <Button
                  key={page.id}
                  onClick={() => navigate(page.route)}
                  sx={{ my: 2, color: "white", display: "block" }}
                  style={
                    window.location.pathname.substring(1) === page.route
                      ? { color: "rgb(255, 229, 0)", fontWeight: "bold" }
                      : {}
                  }
                >
                  {page.label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <LoadingButton
              onClick={logout}
              textAlign="center"
              loading={loading}
              loadingPosition="end"
              variant="text"
              sx={{ color: "#fff" }}
            >
              <span> Logout</span>
            </LoadingButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
