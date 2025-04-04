import React from "react";
import Store from "../../../assets/store.png";
import Saler from "../../../assets/saler.png";
import Nkcompany from "../../../assets/nkcompany.png";
import { Box, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function AboutComponent() {
  const aboutData = [
    {
      title: "A NK Group Company",
      icon: Nkcompany,
    },
    {
      title: "3000+ Online Brands",
      icon: Saler,
    },
    {
      title: "Trusted By 100 Cr+ Shoppers",
      icon: Store,
    },
  ];
  const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div style={{alignItems:'center',justifyContent:'center',padding:10}}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          style={{ color: "#b12a5b",marginBottom:30,justifySelf:'center'}}
        >
          About Coupon Mania
        </Typography>
        <div style={{display:'flex',justifyContent:'space-between',flexDirection:matches?'column':'row',alignItems:'center'}}>
          {aboutData.map((item, index) => (
            <div key={index} style={{background:'#e9f4f6',borderRadius:10,padding:30,width:300,display:'flex',alignItems:'center',marginBottom:matches?'15px':''}}>
              <Box
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  margin: 15,
                }}
              >
                <img src={item.icon} alt={item.title} style={{width:80,margin:20}} />
              </Box>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
    </div>
  );
}
