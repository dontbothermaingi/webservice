import { FormatQuote } from "@mui/icons-material";
import { Box, Rating, Typography } from "@mui/material";
import { HorMotion, Motion } from "./motion";

function Page4 (){

    function reviewCard(message,initials, user, occupation, service){
        return (
            <Box 
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                padding={'20px'}
                height={'350px'}
                gap={'20px'}
                sx={{
                    backgroundColor:'white',
                    borderRadius:'20px'
                }}
            >

                <Rating value={5} readOnly/>

                <FormatQuote/>

                <Typography fontFamily={'DM Light'} fontSize={{md:'16px', xs:"14px"}}>{message}</Typography>

                <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                    <Typography
                        sx={{
                            backgroundColor:'#22c55e',
                            padding:{md:'30px', xs:'20px'},
                            width:{md:'40px', xs:"30px"},
                            height:{md:'40px', xs:"30px"},
                            borderRadius:'50%',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            fontSize:{md:'17px', xs:'15px'}
                        }}
                        fontFamily={"GT Bold"}
                    >
                        {initials}
                    </Typography>

                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography fontFamily={'GT Medium'} fontSize={{md:"16px", xs:'13px'}}>{user}</Typography>
                        <Typography fontFamily={'GT Light'} fontSize={{md:"16px", xs:'13px'}} color="gray">{occupation}</Typography>
                        <Typography fontFamily={'GT Light'} fontSize={{md:"16px", xs:'13px'}} color="gray">{service}</Typography>

                    </Box>
                </Box>
            </Box>
        )
    }

    const cards = [
            reviewCard("Found an amazing carpenter through this platform. The quality of work exceeded my expectations, and the booking process was seamless.", "SJ", "Sarah Johnson", "Homeowner", "Kitchen Renovation"),
            reviewCard("As a service provider, this platform has helped me connect with so many new customers. The support team is fantastic too!","MC","Michael Chen","Small Business Owner", "Auto Repair Services"),
            reviewCard("The content writers I found here are top-notch. They helped grow my blog readership by 300% in just 3 months.","ER","Emily Rodriguez","Freelancer","Content Writing"),
            reviewCard("I use this platform for all my property maintenance needs. Reliable professionals, fair pricing, and excellent results every time.", "DP", "David Park", "Property Manager", "Property Maintenance"),
    ]
    return ( 
        <Box 
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            // gap={'30px'}
            sx={{
                px:{xs:2, md:20},
                backgroundColor:'#051023',
                padding:'90px'
            }}
        >
            <Motion>
                <Typography fontFamily={"DM Bold"} fontSize={{md:'60px', xs:'28px'}} color="white">What Our Users Say</Typography>
            </Motion>

            <Motion>
                <Typography fontFamily={"DM Light"} fontSize={{md:'18px', xs:'14px'}} textAlign={'center'} color="white" lineHeight={'1.2'}>Join thousands of satisfied customers and professionals who trust our platform.</Typography>
            </Motion>

            <Box
                display={'grid'}
                gridTemplateColumns={{md:'repeat(4,1fr)', xs:'repeat(1,1fr)'}}
                gap={'20px'}
                padding={'10px'}
                mt={'40px'}
            >
                {cards.map((card, index) => (
                    <HorMotion index={index} key={index}>
                        <Box>
                            {card}
                        </Box>
                    </HorMotion>
                ))}
                
            </Box>

        </Box>
     );
}
 
export default Page4;