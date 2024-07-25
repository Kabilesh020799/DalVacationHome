import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export default function NavBar({ isLoggedIn, handleSignOut }) {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ color: "white", mr: 2 }}
          >
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/home")}
            sx={{ flexGrow: 1, color: "white", cursor: "pointer" }}
          >
            DalVacation Home
          </Typography>
          {userType === "Agent" ? (
            <Typography
              variant="body1"
              onClick={() => navigate("/statistics")}
              sx={{ marginLeft: "20px", cursor: "pointer", color: "white" }}
            >
              Statistics
            </Typography>
          ) : null}
          {isLoggedIn ? (
            <>
              {userType === "Customer" ? (
                <Typography
                  variant="body1"
                  onClick={() => navigate("/my-bookings")}
                  sx={{ marginLeft: "20px", cursor: "pointer", color: "white" }}
                >
                  My Bookings
                </Typography>
              ) : null}

              <Typography
                variant="body1"
                onClick={() => navigate("/tickets")}
                sx={{ marginLeft: "20px", cursor: "pointer", color: "white" }}
              >
                Tickets
              </Typography>
              <Button
                color="inherit"
                sx={{ color: "white" }}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="body1"
                onClick={() => navigate("/login")}
                sx={{ marginLeft: "20px", cursor: "pointer", color: "white" }}
              >
                Login
              </Typography>
              <Typography
                variant="body1"
                onClick={() => navigate("/signup")}
                sx={{ marginLeft: "20px", cursor: "pointer", color: "white" }}
              >
                Sign Up
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
