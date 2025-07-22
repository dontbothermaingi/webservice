import { Box, Drawer, IconButton, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // For mobile menu icon
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

function NavBar (){

    const isMobile = useMediaQuery("(max-width:768px)")
    const access_token = localStorage.getItem("access_token")
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("")
    const [openDrawer, setOpenDrawer] = useState(false)

    // New state for menu anchor
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function handleDrawer(){
        setOpenDrawer(!openDrawer)
    }

    const { data:session } = useQuery({
        queryKey: ['secureData'],
        queryFn: () =>
          fetch('https://webservice-db-58ug.onrender.com/check_session', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }).then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          }),
      });

    useEffect(() => {
        if (session) {
          setUsername(session?.username);
          setIsAuthenticated(true);
        }
      }, [session]);

    const onLogout = () => {
        // Clear tokens & update state
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_expiry");
        setIsAuthenticated(false);
        setAnchorEl(null);
        navigate("/login"); // optional redirect after logout
    };


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    function handleSubmit(){
        fetch("https://webservice-db-58ug.onrender.com/logout",{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${access_token}`
            },
            credentials:"include"
        })
        .then(response => response.json())
        .then(()=>{
            onLogout()
            setIsAuthenticated(false)
        })
        .catch((error) => {
            console.error(error, "Failed to Log out")
        })
    }

    return ( 

        <Box
            sx={{
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                backdropFilter: 'blur(10px)',
                backgroundColor:"#0c182a",
                zIndex: 1000,  // Make sure it stays above other content
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 2, md: 20 },  // This is the "content width" control
                    pt: {md:'30px', xs:"10px"},
                    pb: {md:'30px', xs:"10px"},
                  }}
            >
                <Box>
                    <Typography fontFamily={"DM Light"} fontSize={{xs:'20px', md:'22px'}} onClick={() => navigate('/')} sx={{cursor:'pointer'}} color='white'>Webservice</Typography>
                </Box>

                {isMobile? (
                    <IconButton onClick={handleDrawer}>
                        <MenuIcon sx={{color:'white', fontSize:'35px', py:0.8}}/>
                    </IconButton>
                ):(
                    <Box display={'flex'} gap={'20px'}>
                        <Typography fontFamily={"DM Light"} fontSize={{xs:'20px', md:'17px'}}color='white' onClick={() => navigate('/')}sx={{cursor:'pointer', py:0.8}}>Home</Typography>
                        <Typography fontFamily={"DM Light"} fontSize={{xs:'20px', md:'17px'}} color='white' onClick={() => navigate('/services')} sx={{cursor:'pointer', py:0.8}}>Services</Typography>
                        {isAuthenticated ? (
                            <>
                            <Box
                              onClick={handleMenuOpen}
                              sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                px: 1.5,
                                py: 0.8,
                                borderRadius: 2,
                                bgcolor: open ? "rgba(255,255,255,0.1)" : "transparent",
                                "&:hover": {
                                  bgcolor: "rgba(255,255,255,0.1)",
                                },
                                color: "white",
                                transition: "background 0.3s ease",
                              }}
                            >
                              <User className="w-5 h-5" />
                              <Typography sx={{ fontWeight: 500 }}>{username}</Typography>
                              <KeyboardArrowDown
                                sx={{
                                  transition: "transform 0.3s ease",
                                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                              />
                            </Box>
                          
                            <Menu
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleMenuClose}
                              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                              transformOrigin={{ vertical: "top", horizontal: "right" }}
                              PaperProps={{
                                sx: {
                                  mt: 1,
                                  borderRadius: 2,
                                //   minWidth: 160,
                                  boxShadow: 3,
                                },
                              }}
                            >
                              <MenuItem onClick={handleSubmit}>Logout</MenuItem>
                              {/* Add more MenuItem here */}
                            </Menu>
                          </>
                          
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="flex items-center justify-center h-10 px-8 rounded-md text-slate-100 bg-gradient-to-r from-green-500 to-green-900"
                            >
                                Login
                            </button>
                        )}

                    </Box>
                )}
            </Box>

            <Drawer
                anchor="top"
                open={openDrawer}
                onClose={handleDrawer}
                PaperProps={{
                    sx: {
                      backgroundColor: '#0c182a',
                      color: 'white',
                      p: 2,
                    },
                  }}
            >
                <Typography onClick={() => navigate("/")} fontFamily={'DM Regular'} sx={{cursor:'pointer'}} py={1} textAlign={'center'}>Home</Typography>
                <Typography onClick={() => navigate("/services")} fontFamily={'DM Regular'} sx={{cursor:'pointer'}} py={1} textAlign={'center'}>Services</Typography>
                {isAuthenticated ? (
                    <Typography onClick={handleSubmit} fontFamily={'DM Regular'} sx={{cursor:'pointer'}} py={1} textAlign={'center'}>Log Out</Typography>
                ):(
                    <Typography onClick={() => navigate('/login')} fontFamily={'DM Regular'} sx={{cursor:'pointer'}} py={1} textAlign={'center'}>Login</Typography>
                )}

            </Drawer>
        </Box>
     );
}
 
export default NavBar;