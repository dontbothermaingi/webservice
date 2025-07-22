import { Facebook, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { HorMotion, Motion } from "./motion";

function Page6() {
    const isMobile = useMediaQuery("(max-width:768px)");

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                px: { xs: 2, md: 20 },
                py: '60px',
                backgroundColor: 'white',
                gap: '60px',
            }}
        >
            {/* Contact Section */}
            <Box display="flex" flexDirection="column" gap="40px" alignItems="center">
                <Box textAlign="center" maxWidth="800px">

                    <Motion>
                        <Typography fontFamily="GT Regular" fontSize="18px" color="gray">
                            Get In Touch
                        </Typography>
                    </Motion>

                    <Motion index={2}>
                        <Typography fontFamily="DM Medium" fontSize={{ xs: '36px', md: '50px' }} fontWeight={600} mt="10px">
                            Connect with real experts fast
                        </Typography>
                    </Motion>

                    <Motion index={3}>
                        <Typography fontFamily="GT Regular" fontSize="16px" color="gray" mt="10px">
                            Need help? We’re here for you.
                        </Typography>
                    </Motion>
                </Box>

                <Box
                    display="flex"
                    flexDirection={isMobile ? 'column' : 'row'}
                    alignItems="center"
                    justifyContent="center"
                    gap="40px"
                    width="100%"
                >
                    {[
                        {
                            title: 'Send an email',
                            desc: 'Quick answers, straight to your inbox.',
                            contact: 'hello@webservice.com',
                        },
                        {
                            title: 'Give us a ring',
                            desc: 'Mon–Fri, 8am–5pm. Let’s chat!',
                            contact: '+1 (555) 000-0000',
                        },
                        {
                            title: 'Drop by our office',
                            desc: 'Pop in for a friendly hello.',
                            contact: '101 Web Lane, SF, CA',
                        },
                    ].map((item, index) => (
                        <HorMotion index={index} key={index}>
                            <Box
                                textAlign="center"
                                maxWidth="250px"
                            >
                                <Typography fontFamily="DM Medium" fontSize="18px">{item.title}</Typography>
                                <Typography fontFamily="DM Light" fontSize="14px" color="gray" mt="5px">{item.desc}</Typography>
                                <Typography fontFamily="DM Regular" fontSize="16px" mt="5px">{item.contact}</Typography>
                            </Box>
                        </HorMotion>
                    ))}
                </Box>
            </Box>

            {/* Footer Section */}
            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                borderTop="1px solid #eee"
                pt="30px"
            >

                <HorMotion index={1}>
                    <Typography fontFamily="DM Medium" fontSize="20px" mb={isMobile ? '20px' : 0}>
                        Webservice
                    </Typography>
                </HorMotion>

                <Box display="flex" alignItems="center" gap="25px" flexWrap="wrap" mb={isMobile ? '20px' : 0}>
                    {['About', 'Experts', 'Help', 'Contact'].map((link, index) => (
                        <HorMotion index={index + 2} key={index}>
                            <Typography
                                fontFamily="DM Light"
                                fontSize="15px"
                                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            >
                                {link}
                            </Typography>
                        </HorMotion>
                    ))}
                </Box>

                <Box display="flex" alignItems="center" gap="10px">
                    {[Facebook, Twitter, LinkedIn, YouTube].map((Icon, index) => (
                        <HorMotion index={index + 3} key={index}>
                            <IconButton sx={{ color: '#555', '&:hover': { color: '#000' } }}>
                                <Icon />
                            </IconButton>
                        </HorMotion>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default Page6;
