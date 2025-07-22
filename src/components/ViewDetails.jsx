import { Box, Typography } from "@mui/material";
import NavBar from "./navbar";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Star } from "@mui/icons-material";
import { useQuery } from '@tanstack/react-query';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { HorMotion, Motion } from "./motion";

function ViewDetails (){

    const {userId} = useParams()
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const access_token = localStorage.getItem("access_token")

    const { data: user } = useQuery({
        queryKey: ['userDetails', userId],
        queryFn: () =>
        fetch(`https://webservice-db-58ug.onrender.com/getuserdetails/${userId}`).then((res) =>
            res.json()
        ),
    });

    const {data:session} = useQuery({
        queryKey:['sesh'],
        queryFn:() => 
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
    })
    

    useEffect(() => {
        if(session){
            setIsAuthenticated(true)
        }
    },[session])

    const imageArray = [
        "/wow.jpg",
        "/bob.jpg",
        "/mary.jpg",
        "/john.jpg",
        "/njoki.jpg",
        "/mec.jpg",
        "/grace.jpg",
        "/hnry.jpg",
        "/home.jpg",
        "/web.jpg",
        "/ppc.jpg",
        "/carp.jpg",
        "/yoga.jpg",
        "/tech.jpg",
        "/make up.jpg",
        "/15.jpg",
        "/17.jpg",
        "/18.jpg",
        "/19.jpg",
        "/20.jpg",
        "/21.jpg",
    ];

    function handleCloseDialog(){
        setOpenDialog(!openDialog)
    }
      

    function handleMessage(receiverId){
        if(isAuthenticated){
            navigate(`/message/${receiverId}`)
        }else{
            setOpenDialog(true)
            setErrorMessage("Login to communicate with expert!")
        }
    }

    return ( 
        <Box>
            {/* Dialog Component */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography fontFamily={"DM Medium"} fontSize={'18px'}>Error</Typography>
                </DialogTitle>

                <DialogContent>
                    <Typography fontFamily={"DM Regular"} color="error" sx={{ mt: 1 }}>
                        {errorMessage || "Something went wrong. Please try again."}
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <button onClick={handleCloseDialog} className="bg-gradient-to-r from-red-700 to-red-400 px-5 py-1 rounded-md">
                        Ok
                    </button>
                </DialogActions>
            </Dialog>

            {/* NavBar Component */}
            <NavBar/>

            {/* Spacer between Navbar and The body */}
            <Box sx={{ height: { xs: '100px', md: '150px' } }} />

            <Box 
                sx={{
                    px:{xs:2, md:20}
                }}
            >
                <div className="flex flex-col md:flex-row gap-20">
                    {/* Left Side */}
                    <img
                        src={imageArray[user?.id - 1]}
                        alt="img"
                         className="h-auto sm:h-24 md:h-150 w-auto md:w-400 rounded-xl animate-fade-in"
                    />


                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <Motion>
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-3 rounded-md">
                                    <Typography color="white" fontFamily={"DM Medium"} >{user?.display_name}</Typography>
                                </div>
                            </Motion>

                            <Motion>
                            { user && user.more_details && user.more_details.map((detail,i) => (
                                <div key={i} className="bg-slate-700/50 px-3 py-3 rounded-md w-fit">
                                    <Typography color="white" fontFamily={"DM Medium"}>{detail.category}</Typography>
                                </div>
                            ))}
                            </Motion>
                            

                        </div>

                        { user && user.more_details && user.more_details.map((detail,i) => (
                        
                            <div key={i}>
                                <Motion index={2}>
                                    <Typography color="white" fontFamily={"DM Bold"} fontSize={{md:'40px', xs:"25px"}}>{detail.jobTitle}</Typography>
                                </Motion>

                                <Motion index={3}>
                                    <Typography color="white" fontFamily={"DM Light"} fontSize={{md:'18px', xs:"15px"}}>{detail.detailedDescription}</Typography>
                                </Motion>
                            </div>

                        ))}


                        {/* Details and Services */}
                        <div className="flex justify-between flex-col md:flex-row">
                            <div className="flex flex-col items-start md:items-start gap-2">
                                <Motion index={4}>
                                    <div className="mt-5 bg-gradient-to-br from-white/10 to-white/5 w-fit px-8 py-2 backdrop-blur-sm hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10  transition-all duration-500 ease-out border border-white/20 rounded-md">
                                        <Typography fontFamily={"GT Regular"} color="white" fontSize={'18px'}>Details</Typography>
                                    </div>
                                </Motion>

                                {user && user.more_details && user.more_details.map((detail,i) => (

                                    <div  key={i} className="flex items-start md:items-start flex-col gap-2">
                                        <HorMotion index={6}>
                                            <div className="flex gap-2">
                                                <Typography fontFamily={"DM Bold"} color="white">Duration: </Typography>
                                                <div className="flex flex-row items-center gap-2 text-gray-400">
                                                    <Typography fontFamily={"DM Light"}>{detail.responseTime}</Typography>
                                                </div>
                                            </div>
                                        </HorMotion>

                                        <HorMotion index={7}>
                                            <div className="flex gap-2">
                                                <Typography fontFamily={"DM Bold"} color="white">Completion Rate: </Typography>
                                                <div className="flex flex-row items-center gap-2 text-gray-400">
                                                    <Typography fontFamily={"DM Light"}>{detail.completionRate}</Typography>
                                                </div>
                                            </div>
                                        </HorMotion>

                                        <HorMotion index={8}>
                                            <div className="flex gap-2">
                                                <Typography fontFamily={"DM Bold"} color="white">Location: </Typography>
                                                <div className="flex flex-row items-center gap-2 text-gray-400">
                                                    <Typography fontFamily={"DM Light"}>{detail.location}</Typography>
                                                </div>
                                            </div>
                                        </HorMotion>

                                        <HorMotion index={9}>
                                            <div className="flex gap-2">
                                                <Typography fontFamily={"DM Bold"} color="white">Rating: </Typography>
                                                {detail.rating && [...Array(Math.floor(detail.rating))].map((_,i) => (
                                                    <Star key={i} sx={{color:'yellow'}}/>
                                                ))}
                                                <div className="flex flex-row items-center gap-2 text-gray-400">
                                                    {/* <Rating value={user.ratings} precision={0.1} readOnly/> */}
                                                    <Typography fontFamily={"DM Light"}>/ {detail.rating}</Typography>
                                                </div>
                                            </div>
                                        </HorMotion>

                                    </div>
                                ))}

                            </div>

                            <div className="flex flex-col items-start md:items-end gap-2">
                                <Motion index={11}>
                                    <div className="mt-5 bg-gradient-to-br from-white/10 to-white/5 w-fit px-8 py-2 backdrop-blur-sm hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10  transition-all duration-500 ease-out border border-white/20 rounded-md">
                                        <Typography fontFamily={"GT Regular"} color="white" fontSize={'18px'}>Services</Typography>
                                    </div>
                                </Motion>

                                <div className="text-slate-400 items-start md:items-end flex flex-col gap-2">
                                    {user && user.services?.map((service, index) => (
                                        <HorMotion index={index + 12}>
                                            <Typography key={index} fontFamily={'DM Light'}>{service.service}</Typography>
                                        </HorMotion>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pay Rate and CTA Button */}
                        <div className="flex flex-row justify-between gap-2 items-center pb-5 pt-5">
                            <div>
                                <Motion index={17}>
                                    <button
                                        onClick={() => handleMessage(user?.id)}
                                        className="w-full xs:w-24 bg-gradient-to-r from-blue-700 to-purple-500 px-5 py-2 rounded-md text-white font-bold transform hover:scale-[1.02] duration-300"
                                    >
                                        <span className="text-sm md:text-base">Talk to Expert</span>
                                    </button>
                                </Motion>
                            </div>

                            {user && user.more_details && user.more_details.map((detail,i) => (
                                <Motion index={18}>
                                    <div key={i} className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 w-fit text-transparent bg-clip-text hover:animate-pulse">
                                        {detail.payRate}
                                    </div>
                                </Motion>
                            ))}

                            
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
     );
}
 
export default ViewDetails;