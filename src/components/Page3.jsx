import { Forum, Person, Search } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { HorMotion, Motion } from "./motion";

function Page3 () {

  function step(icon, number, title, description, color = "#3b82f6") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          border: "1px solid gray",
          borderRadius: "20px",
          padding: { md: "30px", xs: "15px" },
          height: { md: "290px", xs: "100%" }
        }}
      >
        <IconButton
          sx={{
            backgroundColor: color,
            padding: "20px",
            borderRadius: "20px",
            color: "white"
          }}
        >
          {icon}
        </IconButton>

        {/* Centered Number Badge */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { md: "40px", xs: "30px" },
            height: { md: "40px", xs: "30px" },
            borderRadius: "50%",
            border: "1px solid black",
            marginY: "10px"
          }}
        >
          <Typography fontFamily="GT Medium" fontSize={{ md: "16px", xs: "12px" }} color="black">
            {number}
          </Typography>
        </Box>

        <Typography fontFamily="DM Bold" color="black" fontSize={{ md: "20px", xs: "15px" }}>
          {title}
        </Typography>
        <Typography fontFamily="DM Light" textAlign="center" fontSize={{ md: "16px", xs: "14px" }} color="black">
          {description}
        </Typography>
      </Box>
    );
  }

  const cards = [
    step(<Search />, 1, "Find Your Service", "Browse categories or search for the specific service you need.", "#3b82f6"),
    step(<Person />, 2, "Choose a Professional", "View profiles, read reviews, and compare quotes from verified providers.", "#22c55e"),
    step(<Forum />, 3, "Connect & Book", "Message professionals directly and schedule your service.", "#a855f7"),
    step(<Search />, 4, "Get It Done", "Your service provider completes the work. Pay securely and leave a review.", "#f97316")
  ];
  
  return (
    <div>
      <Box
        pt="40px"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundColor: "white",
          padding: { md: "80px", xs: "30px" },
          // height:'100vh'
        }}
      >
        {/* Header Section */}
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#3EF28C",
              alignItems: "center",
              borderRadius: "50px",
              padding: "10px 20px",
              mb: "20px"
            }}
          >

            <Motion>
              <Typography fontFamily="GT Medium" textAlign="center">
                Simple Process
              </Typography>
            </Motion>
          </Box>

          <Motion>
            <Typography fontFamily="GT Bold" color="black" fontSize={{ md: "55px", xs: "20px" }}>
              How It Works
            </Typography>
          </Motion>

          <Motion>
            <Typography
              fontFamily="DM Light"
              textAlign="center"
              color="black"
              fontSize={{ md: "18px", xs: "13px" }}
              mb="20px"
            >
              Getting the help you need is simple. Follow these four easy steps.
            </Typography>
          </Motion>
        </Box>

        {/* Step Cards */}
        <HorMotion>
          <Box
            display="flex"
            flexDirection={{ md: "row", xs: "column" }}
            alignItems="center"
            gap="40px"
            sx={{ px: { xs: 0, md: 20 } }}
            padding="20px"
          >
            {cards.map((card, index) => (
              <HorMotion index={index} key={index}>
                  {card}
              </HorMotion>
            ))}
          </Box>
        </HorMotion>
      </Box>
    </div>
  );
}

export default Page3;
