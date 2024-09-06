import React from "react";
import HomeTable from "../../components/HomeTable";
import Header from "../../components/Header";
function Home() {
  return (
    // <Box
    //   sx={{
    //     width: "100%",
    //     backgroundColor: "white", // Background color for padding area
    //     padding: { xs: "10px", sm: "20px", md: "30px" }, // Responsive padding
    //   }}
    // >
    <>
      <Header />
      <HomeTable />
    </>
    // </Box>
  );
}

export default Home;
