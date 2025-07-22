import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import NavBar from "./navbar";
import HomePage from "./homepage";
import Page2 from "./Page 2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import MobilePage2 from "./MobilePage2";
import './controlpage.css'


function Controlpage({setSearchTerm, searchTerm}) {
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {

        console.log(entry)
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Box mb={{ md: "99px", xs: "110px" }}>
          <NavBar />
        </Box>
        
        <div>
            <HomePage setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>


        {isMobile ? (
          <MobilePage2 />
        ) : (
          <div>
            <Page2 />
          </div>
        )}

        <div>
          <Page3 />
        </div>

        <div>
          <Page4 />
        </div>

        <div>
          <Page5 />
        </div>

        <div>
          <Page6 />
        </div>
      </Box>
    </div>
  );
}

export default Controlpage;
