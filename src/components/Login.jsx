import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, TextField, Typography, Link, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login({onLogin}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();


  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://webservice-db-58ug.onrender.com/login", {
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify(formData)
    })
    .then(response => response.json())
    .then((data) => {
      console.log("Login response:", data);
      onLogin(data)
      navigate("/")
    })
    .catch((error) => {
      console.error(error, "Failed to Login")
    })
    
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: "#0c182a",
        px: 2,
      }}
    >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: 5,
            width: "100%",
            maxWidth: 400,
            boxShadow: 5,
          }}
        >
          {/* Title */}
          <Typography
            fontFamily="DM Medium"
            fontSize="36px"
            textAlign="center"
            color="primary"
            mb={1}
          >
            Webservice
          </Typography>

          {/* Welcome Message */}
          <Typography
            textAlign="center"
            fontFamily="DM Regular"
            fontSize="18px"
            color="text.secondary"
            mb={3}
          >
            Welcome Back! Please log in to your account.
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              value={formData.username}
              onChange={handleChange}
              label="Username"
              name="username"
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />

            <TextField
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              label="Password"
              name="password"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              InputProps={{
                endAdornment:(
                  <IconButton onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                )
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                fontFamily: "DM Bold",
                textTransform: "none",
                backgroundColor: "#0c182a",
                '&:hover': {
                  backgroundColor: "#0a1422",
                },
              }}
            >
              Login
            </Button>
          </form>

          {/* Register Option */}
          <Typography
            textAlign="center"
            mt={3}
            fontSize="14px"
            color="text.secondary"
          >
            Don’t have an account?{" "}
            <Link href="/register" underline="hover" fontWeight="bold" color="primary">
              Register
            </Link>
          </Typography>
        </Box>
    </Box>
  );
}

export default Login;
