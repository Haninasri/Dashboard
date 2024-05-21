//import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
const customize = {
    height: 500,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: 'descending',
  };
export default function Renewable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [row, setRow] = useState([]);
  useEffect(() => {
    const getAdmins = async () => {
      const admins = await getDocs(collection(db, "Access"));
      admins.forEach((admin) => {
        console.log(admin.data());
        setRow((r) => ([
          ...r,
          {
              id: admin.data().year,
              rural: admin.data().rural,
              urban: admin.data().urban,
              Access: admin.data().Access,
              renewable: admin.data().renewable,
              
          },
      ]));
      

      });
    };

    getAdmins();
  }, []);
  const data =row.sort((a, b) => (a.id > b.id) ? 1 : -1)
  console.log(data)
  //console.log("row",row)
  //console.log("data",data)
  
  return (
    <>
    <Box>
    <Typography variant="h6" color={colors.grey[100]}>
    Tunisia has been increasingly focusing on renewable energy as a means to diversify its energy sources, reduce dependence on imports, and mitigate environmental impacts. Here's an overview of Renewable energy consumption (% of total final energy consumption).
        <a target='_blank'
            rel='noopener noreferrer' href="https://data.humdata.org/dataset/world-bank-energy-and-mining-indicators-for-tunisia">Source DataSet</a>
 </Typography>
 <LineChart
    xAxis={[{ dataKey: "id" }]}
    series={[{ dataKey: 'renewable',label: 'Renewable energy consumption (% of total final energy consumption)' },]}
    dataset={data}
      {...customize}
    />
    </Box>
    </>
    
  );
}
