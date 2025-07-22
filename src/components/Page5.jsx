import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Motion } from "./motion";

function Page5() {
  const faqItems = [
    {
      summary: "How do I connect with experts?",
      details: "Use the search or browse categories to find professionals who fit your needs. Each profile features credentials and user reviews for easy comparison."
    },
    {
      summary: "Are professionals screened?",
      details: "All professionals are screened with background checks and credential verification to ensure safety and reliability."
    },
    {
      summary: "Can I change my appointment?",
      details: "Reschedule anytime from your dashboard. Select your booking and pick a new date or time that works for you."
    },
    {
      summary: "How do I pay for services?",
      details: "Payments are handled securely on our platform. Use major credit cards or supported methods, and receive a receipt for every transaction."
    }
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ 
        px: { xs: 2, md: 20 }, 
        py: { xs: 6, md: 10 },
        backgroundColor:'#0c182a'
    }}
    >

      <Motion>
        <Typography
          fontFamily="DM Bold"
          fontSize={{ xs: '36px', md: '60px' }}
          color="white"
          textAlign="center"
          mb={2}
        >
          Frequently Asked Questions
        </Typography>
      </Motion>

      <Motion>
        <Typography
          fontFamily="DM Light"
          fontSize={{ xs: '16px', md: '18px' }}
          color="white"
          textAlign="center"
          maxWidth="800px"
          lineHeight={1.5}
          mb={5}
        >
          Find quick answers to common questions about connecting with professionals, booking appointments, and making secure payments.
        </Typography>
      </Motion>

      <Box width="100%" maxWidth="900px">
        {faqItems.map((item, index) => (
          <Motion index={index} key={index}>
            <Accordion
              key={index}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                color: 'white',
                mb: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(4px)',
                '&:before': { display: 'none' }, // remove default border
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                sx={{
                  fontFamily: 'DM Regular',
                  fontSize: '20px',
                }}
              >
                {item.summary}
              </AccordionSummary>

              <AccordionDetails>
                <Typography
                  fontFamily="DM Light"
                  fontSize="16px"
                  color="white"
                  lineHeight={1.6}
                >
                  {item.details}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Motion>
        ))}
      </Box>
    </Box>
  );
}

export default Page5;
