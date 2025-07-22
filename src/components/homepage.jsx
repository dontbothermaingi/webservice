import { Box, Divider, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import { ArrowForward, CheckCircle, Search, Star, TrendingUp } from "@mui/icons-material";
import { useState } from "react";
import CountUp from "react-countup";
import { Motion } from "./motion";
import { useNavigate } from "react-router";

function HomePage ({setSearchTerm, searchTerm}){

    const isMobile = useMediaQuery("(max-width:768px)")
    const navigate = useNavigate()


    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X relative to card
        const y = e.clientY - rect.top;  // Mouse Y relative to card

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 80;  // Invert to make it intuitive
        const rotateY = (x - centerX) / 80;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease',
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            transition: 'transform 0.5s ease',
        });
    };

    function handleSearch(){
        navigate(`/services`)
    }

    return ( 
        <div>
            <Box 
                sx={{
                    // backgroundColor:'#813ef2',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    paddingTop:'30px',
                    gap:'20px',
                    // margin:'auto',
                    height:'100%',
                    px:{xs:2, md:20},
                    mb:'180px'
                    
                }} 
            >
                
                {/* HomePage */}
                <Box display={'flex'} alignItems={'center'} flexDirection={{md:'row', xs:'column'}}>

                    {/* Left Side */}
                    <Box display={'flex'} flexDirection={'column'} alignItems={isMobile && 'center'} gap={'20px'} width={{md:'80%', xs:'100'}}>

                        <Motion>
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                gap={'20px'}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter:'blur(10px)',
                                    borderRadius:'10px',
                                    width:{md:'320px'},
                                    padding:'10px',
                                }}
                            >
                                <CheckCircle sx={{color:'white'}}/>
                                <Typography fontFamily={"DM Light"} color="white" fontSize={{xs:'12px', md:'16px'}}>Trusted by 50,000+ professionals</Typography>
                            </Box>
                        </Motion>
                        
                        <Motion>
                            <Box>
                                {isMobile ? (
                                    <Typography color='white' fontFamily={"DM Regular"} fontSize={{md:"90px", xs:"50px"}} textAlign={'center'} sx={{ lineHeight:'1'}}>Experts for every need, instantly</Typography>
                                ):(
                                    <Typography color='white' fontFamily={"DM Regular"} fontSize={{md:"90px", xs:"50px"}} sx={{ lineHeight:'1'}}>Experts for<br/> every need,<br/> instantly</Typography>
                                )}
                            </Box>
                        </Motion>
                        
                        <Motion>
                            <Box>
                                {isMobile ? (
                                    <Typography color='white' fontFamily={"DM Light"} textAlign={'center'} fontSize={{md:"20px", xs:'14px'}} sx={{ lineHeight:'1.2'}}>Easily find and hire trusted professionals for any service. Compare options, review credentials, and connect—all in one place.</Typography>
                                ):(
                                    <Typography color='white' fontFamily={"DM Light"} fontSize={{md:"20px", xs:'14px'}} sx={{ lineHeight:'1.2'}}>Easily find and hire trusted professionals for any service. Compare <br/> options, review credentials, and connect—all in one place.</Typography>
                                )}
                            </Box>
                        </Motion>

                        {/* Search Bar */}
                        <Motion>
                            <Box display={'flex'} gap={'10px'} alignItems={'center'} flexDirection={{md:'row', xs:'column'}}>
                                <TextField
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={isMobile ? "eg. Carpenter" : "What Service do you need today?"}
                                    sx={{
                                        width: isMobile ? '100%': '300px',
                                        '& .MuiOutlinedInput-root':{
                                            borderRadius:'7px',
                                            color:'black',
                                            backgroundColor:'white',
                                            '& fieldset':{
                                                borderColor:'transparent'
                                            },
                                            '&:hover fieldset':{
                                                borderColor:'#ccc'
                                            },
                                            '&.Mui-focused fieldset':{
                                                borderColor:'#813ef2'
                                            }
                                        },
                                        '& input': {
                                            padding: '10px 14px',  // Optional: better spacing inside the input
                                            height:{md:'38px', xs:'20px'},
                                            fontFamily:"DM Regular"
                                        },
                                    }}
                                    variant="outlined"
                                    slotProps={{
                                        input:{
                                            endAdornment: isMobile && <InputAdornment position="end"> 
                                                <IconButton onClick={() => handleSearch()}>
                                                    <Search/>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    }}
                                />

                                {!isMobile && 
                                    <Box
                                        onClick={() => navigate("/services")}
                                        sx={{
                                            borderRadius:'30px',
                                            padding:'5px',
                                            display:'flex',
                                            alignItems:'center',
                                            gap:'20px',
                                            backgroundColor:'#3EF28C',
                                            transition: 'background-color 0.6s ease-in-out',
                                            cursor:'pointer',
                                            "&:hover":{
                                                backgroundColor:'#EA4C89',
                                                "& .arrowIcon":{
                                                    transform:'rotate(0deg)'
                                                }
                                            }
                                        }}
                                    >
                                        <Typography fontFamily={"GT Regular"} pl={'20px'} pt={'12px'} pb={'12px'}>Browse Experts</Typography>

                                        <IconButton 
                                            sx={{ 
                                                backgroundColor:'white',
                                                // transition:"transform 0.6s ease-in-out"
                                            }}
                                        >
                                            <ArrowForward className="arrowIcon" sx={{color:'black', transform:'rotate(-30deg)', transition: 'transform 0.6s ease-in-out',}}/>
                                        </IconButton>
                                    </Box>
                                }
                            </Box>
                        </Motion>

                        {/* Ratings */}
                        <Motion>
                            <Box display={'flex'} gap={'10px'} alignItems={'center'} flexDirection={{xs:'column', md:'row'}}>

                                <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                                    <Box>
                                        {[...Array(5)].map((_,i) => (
                                            <Star key={i} sx={{color:'yellow'}}/>
                                        ))}
                                    </Box>
                                    <Typography fontFamily={"GT Regular"} color="white">4.9/5</Typography>
                                    <Typography fontFamily={"DM Light"} color="white">from 7k+ reviews</Typography>
                                </Box>

                                {/* Completion Rate */}
                                <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                                    <TrendingUp sx={{color:"lightgreen"}}/>
                                    <Typography fontFamily={"GT Regular"} color="white">95% completion rate</Typography>
                                </Box>
                            </Box>
                        </Motion>

                        <Motion>
                            {isMobile && (
                                <button
                                    onClick={() => navigate("/services")}
                                    className="bg-gradient-to-r from-purple-700 to-pink-700 text-white items-center px-10 py-2 rounded-md cursor-pointer"
                                >
                                    <span>View Service Providers</span>
                                </button>
                            )}
                        </Motion>
                        

                        
                    </Box>

                    {/* Right Side */}
                    {!isMobile && 
                        <Box
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            sx={{
                                backgroundColor:'white',
                                width:{md:'100%'},
                                padding:'20px',
                                borderRadius:'10px',
                                marginTop:{xs:'30px', md:'0'},
                                ...style
                            }}
                        >

                            {/* Top Part */}
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Typography fontFamily={"DM Bold"} fontSize={{md:'30px'}}>Live Activity</Typography>
                                    <Typography fontFamily={"DM Light"}>Service booked today</Typography>
                                </Box>
                                
                                <Box
                                    sx={{
                                        borderRadius:'9999px',
                                        animation:'pulse',
                                        backgroundColor:'rgba(220, 252, 231, 1)',
                                        padding:'15px',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyItems:'center',
                                        gap:'20px',
                                        height:'3px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                        width: '8px',      // Equivalent to w-2
                                        height: '8px',     // Equivalent to h-2
                                        backgroundColor: '#22c55e', // Tailwind's green-500
                                        borderRadius: '50%',
                                        animation: 'pulse 1.5s infinite',
                                        }}
                                    />

                                    <Typography fontFamily={'DM Regular'} color='#15803d'>Live</Typography>

                                    <style>
                                        {`
                                            @keyframes pulse {
                                                0% { transform: scale(1); opacity: 1; }
                                                50% { transform: scale(1.5); opacity: 0.5; }
                                                100% { transform: scale(1); opacity: 1; }
                                            }
                                        `}
                                    </style>


                                </Box>
                            </Box>

                            <Divider style={{padding:'10px'}}/>

                            {/* Middle Part */}
                            <Box
                                display={'grid'}
                                gridTemplateColumns={{md:'repeat(1,1fr)'}}
                                gap={'20px'}
                                paddingTop={'20px'}
                            >
                                <Box
                                    display={'flex'}
                                    alignItems={'center'}
                                    sx={{
                                        backdropFilter:'blur(10px)',
                                        borderRadius:'10px',
                                        padding:'20px',
                                        gap:'20px',
                                        '&:hover':{
                                            backgroundColor:'#f5f6f8'
                                        }
                                        
                                    }}
                                >

                                    <Box
                                        sx={{
                                            padding:'10px',
                                            backgroundColor:'#3579f3',
                                            justifyContent:'center',
                                            borderRadius:'12px'
                                        }}
                                    >
                                        <Typography fontFamily={"DM Bold"}>AC</Typography>
                                    </Box>

                                    <Box display={'flex'} flexDirection={'column'}>
                                        <Typography fontFamily={"DM Bold"}>Alex Chen</Typography>
                                        <Typography fontFamily={"DM Light"}>Web Developer - Ecommerce Website Builder</Typography>
                                        <Typography fontFamily={"DM Light"} fontSize={{md:'13px'}}>2 min ago</Typography>

                                    </Box>

                                    <Box>
                                        <Typography fontFamily={"DM Bold"} color="green">
                                            {new Intl.NumberFormat('en-US', {style:'currency', currency:"USD"}).format(2100)}
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box
                                    display={'flex'}
                                    alignItems={'center'}
                                    sx={{
                                        backdropFilter:'blur(10px)',
                                        borderRadius:'10px',
                                        gap:'20px',
                                        padding:'20px',
                                        '&:hover':{
                                            backgroundColor:'#f5f6f8'
                                        }
                                    }}
                                >

                                    <Box
                                        sx={{
                                            padding:'10px',
                                            backgroundColor:'#c350d2',
                                            justifyContent:'center',
                                            borderRadius:'12px'
                                        }}
                                    >
                                        <Typography fontFamily={"DM Bold"}>MR</Typography>
                                    </Box>

                                    <Box display={'flex'} flexDirection={'column'}>
                                        <Typography fontFamily={"DM Bold"}>Maria Rodriguez</Typography>
                                        <Typography fontFamily={"DM Light"}>Interior Designer • Living room makeover</Typography>
                                        <Typography fontFamily={"DM Light"} fontSize={{md:'13px'}}>15 min ago</Typography>

                                    </Box>

                                    <Box>
                                        <Typography fontFamily={"DM Bold"} color="green">
                                            {new Intl.NumberFormat('en-US', {style:'currency', currency:"USD"}).format(1800)}
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box
                                    display={'flex'}
                                    alignItems={'center'}
                                    sx={{
                                        backdropFilter:'blur(10px)',
                                        borderRadius:'10px',
                                        gap:'20px',
                                        padding:'20px',
                                        '&:hover':{
                                            backgroundColor:'#f5f6f8',
                                        }
                                    }}
                                >

                                    <Box
                                        sx={{
                                            padding:'10px',
                                            backgroundColor:'#f35831',
                                            justifyContent:'center',
                                            borderRadius:'12px'
                                        }}
                                    >
                                        <Typography fontFamily={"DM Bold"}>JW</Typography>
                                    </Box>

                                    <Box display={'flex'} flexDirection={'column'}>
                                        <Typography fontFamily={"DM Bold"}>James Wilson</Typography>
                                        <Typography fontFamily={"DM Light"}>Photographer • Wedding photography</Typography>
                                        <Typography fontFamily={"DM Light"} fontSize={{md:'13px'}}>1 hour ago</Typography>

                                    </Box>

                                    <Box>
                                        <Typography fontFamily={"DM Bold"} color="green">
                                            {new Intl.NumberFormat('en-US', {style:'currency', currency:"USD"}).format(1200)}
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box>

                            <Divider style={{padding:'10px'}}/>

                            {/* Bottom Part */}
                            <Box
                                display={'grid'}
                                gridTemplateColumns={{md:'repeat(3,1fr)'}}
                                mt={'10px'}
                            >
                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Typography fontFamily={"GT Bold"} fontSize={{md:'30px'}}>
                                        <CountUp start={0} end={156} duration={2.5}/>
                                    </Typography>
                                    <Typography fontFamily={"GT Light"}>Active Today</Typography>
                                </Box>

                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Typography fontFamily={"GT Bold"} fontSize={{md:'30px'}}>
                                        <CountUp start={0} end={12} duration={2.5} separator="," prefix="$"/>K
                                    </Typography>
                                    <Typography fontFamily={"GT Light"}>Earned Today</Typography>
                                </Box>

                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Typography fontFamily={"GT Bold"} fontSize={{md:'30px'}}>
                                        <CountUp start={0} end={98} duration={5} separator=","/>
                                    </Typography>
                                    <Typography fontFamily={"GT Light"}>Satisfaction</Typography>
                                </Box>
                                
                            </Box>
                        </Box>
                    }
                    
                </Box>
                

            </Box>
        </div>
     );
}
 
export default HomePage;