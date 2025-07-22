import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {Alert, Box,Button,CircularProgress,IconButton,Snackbar,Step,StepLabel,Stepper,TextField,Typography,} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
  
  function CustomerReg() {
    const [activeStep, setActiveStep] = useState(0);
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [conShowPassword, setConShowPassword] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [indication, setIndication] = useState(true)
    const [skipped, setSkipped] = useState(new Set());
    const navigate =  useNavigate()
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      display_name: "",
      date_of_birth: "",
      email:"",
      username:"",
      password:"",
      confirm_password:"",
      role: "customer",
    });
  
    const steps = ["First Name", "Last Name", "Date of Birth", "Display Name", "Email", "Username", "Password"];
  
    const isStepSkipped = (step) => skipped.has(step);
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setFormData({
        first_name: "",
        last_name: "",
        display_name: "",
        date_of_birth: "",
        email:"",
        username:"",
        role: "customer",
      });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      setRegistering(true)
      setIndication(false)

      setTimeout(() => {

        if(formData.password !== formData.confirm_password){
          setOpenSnackBar(true)
          setErrorMessage("Passwords do not match")
          setRegistering(false)
          return
        }

        fetch("https://webservice-db-58ug.onrender.com/register", {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })
        .then(response => response.json())
        .then((data) => {
          console.log("Registered Successfully:", data);
          setRegistering(false)


        })
        .catch((error) => {
          console.error(error, "Failed to register")
          setRegistering(false)
          setOpenSnackBar(true)
          setErrorMessage("Failed to Register")
          
        })


      }, 5000)
    };
  
    const renderStepContent = (step) => {
      switch (step) {
        case 0:
          return (
            <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>
                <Typography sx={{color:'gray'}} fontFamily={"DM Light"} textAlign={'center'}>Enter your first name</Typography>
                <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                fullWidth
                />
            </Box>
          );
        case 1:
          return (
            <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>
                <Typography sx={{color:'gray'}} fontFamily={"DM Light"} textAlign={'center'}>Enter your last name</Typography>
                <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                fullWidth
                />
            </Box>
          );
        case 2:
          return (
            <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>
                <Typography sx={{color:'gray'}} fontFamily={"DM Light"} textAlign={'center'}>Enter your date of birth</Typography>
                <TextField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </Box>
          );
        case 3:
            return (

            <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>
                <Typography sx={{color:'gray'}} fontFamily={"DM Light"} textAlign={'center'}>Display Name is the name others will see when you interact on the platform. It can be your real name or a name you’d like to be known by</Typography>
                <TextField 
                 type="text"
                 value={formData.display_name}
                 name="display_name"
                 onChange={handleChange}
                 label={"Display Name"}
                 fullWidth
                />
            </Box>
            );
        case 4:
            return (
                <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>

                    <Typography sx={{color:'gray'}} fontFamily={"DM Light"} textAlign={'center'}>Enter your email</Typography>
                    <TextField 
                        type="text"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        label={"Email"}
                        fullWidth
                    />
                </Box>
            );
        case 5:
            return (

                <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>

                <Typography fontFamily={"DM Light"} sx={{color:'gray'}} textAlign={'center'}>Enter your username. You can't change your username, so choose wisely.</Typography>

                <TextField 
                    type="text"
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                    label={"Username"}
                    fullWidth
                />

                </Box>
            );
        case 6:
              return (
  
                  <Box display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>
  
                      <Typography fontFamily={"DM Light"} sx={{color:'gray'}} textAlign={'center'}>Enter your password</Typography>
      
                      <TextField 
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          name="password"
                          onChange={handleChange}
                          label={"Password"}
                          fullWidth
                          InputProps={{
                            endAdornment:(
                              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                              </IconButton>
                            )
                          }}
                      />

                      <TextField 
                          type={conShowPassword ? "text" : "password"}
                          value={formData.confirm_password}
                          name="confirm_password"
                          onChange={handleChange}
                          label={"Confirm Password"}
                          fullWidth
                          InputProps={{
                            endAdornment:(
                              <IconButton onClick={() => setConShowPassword((prev) => !prev)}>
                                  {conShowPassword ? <VisibilityOff/> : <Visibility/>}
                              </IconButton>
                            )
                          }}
                      />
                      
                  </Box>
              );
        default:
          return "Unknown step";
      }
    };

    function handleCloseSnackBar(event, reason){
      if( reason === 'clickaway') return;
      setOpenSnackBar(false)
    }
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={{ xs: 2, md: 5 }}
        minHeight="100vh"
      >

        <Snackbar
          open={openSnackBar}
          onClose={handleCloseSnackBar}
          autoHideDuration={6000}
          anchorOrigin={{horizontal:'center', vertical:'bottom'}}
        >
          <Alert onClose={handleCloseSnackBar} severity={errorMessage.startsWith("Failed" || "Passwords") ? "error":"success"}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: 4,
            width: "100%",
            maxWidth: 1200,
            boxShadow: 3,
          }}
        >
          <Typography fontFamily={"GT Bold"} fontSize={"19px"} mb={1} textAlign="center">
            Registration
          </Typography>

          <Typography
            textAlign="center"
            mb={4}
            fontSize="14px"
            color="text.secondary"
            onClick={() => navigate("/login")}
          >
            You have an account?{" "}
            <Link underline="hover" fontWeight="bold" color="primary">
              Login
            </Link>
          </Typography>

          <Box overflow={'auto'}>
            <Stepper activeStep={activeStep} sx={{ minWidth: "1000px" }}>
              {steps.map((label, index) => (
                <Step key={index} >
                  <StepLabel>
                      <Typography fontFamily={"DM Regular"}>{label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
  
          <Box mt={4}>
            {activeStep === steps.length ? (
              <>

              {indication ? (
                <Typography sx={{ mt: 2, mb: 1 }} fontFamily={"DM Regular"} textAlign={'center'}>
                    All steps completed — you're finished!
                </Typography>
              ):(
                <Box>
                    {registering ? (
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={'30px'} padding={'20px'}>
                            <CircularProgress sx={{fontSize:'8px'}}/>
                            <Typography fontFamily={"DM Light"} fontSize={'18px'}>Creating your new profile</Typography>
                        </Box>
                    ):(
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} justifyContent={'center'} padding={'20px'}>
                            <CheckCircle style={{color:'green'}}/>
                            <Typography fontFamily={"DM Regular"} fontSize={'18px'} textAlign={'center'} color="green">
                                Succesfully Registered
                            </Typography>
                        </Box>
                    )}
                </Box>

            )}

                
                <Button variant="contained" onClick={handleSubmit}>
                  Register
                </Button>
                <Button onClick={handleReset} sx={{ ml: 2 }}>
                  Reset
                </Button>
              </>
            ) : (
              <>
                {renderStepContent(activeStep)}
  
                <Box display="flex" justifyContent="space-between" mt={3}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && !formData.first_name) ||
                      (activeStep === 1 && !formData.last_name) ||
                      (activeStep === 2 && !formData.date_of_birth) ||
                      (activeStep === 6 && formData.confirm_password !== formData.password)
                    }
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
  
  export default CustomerReg;
  