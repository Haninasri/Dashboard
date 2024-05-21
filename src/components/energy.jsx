import { LineChart } from '@mui/x-charts/LineChart';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Renewable from "./renewable"
//import TestNew from './test-new';
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
import {Typography} from "@material-ui/core"


const customize = {
  height: 500,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
};
export default function EnerGy() {
  const [row, setRow] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            Access: admin.data().access,
            renewable: admin.data().renewable,
              
          },
      ]));
      });
    };

    getAdmins();
  }, []);
  // const Accc = row.filter(en =>
  //  en.indicatorName === 'Access to electricity, urban (% of urban population)'
  //);
  const data =row.sort((a, b) => (a.id > b.id) ? 1 : -1)
  console.log(data)

  
  
  return (
    <>
    <Typography variant="h6" color={colors.grey[100]}>
        The Tunisian economy needs ever-increasing amounts of energy to sustain economic growth, raise living standards, and reduce poverty. In this example we analysis some data for Tunisian energy  to explain our economy situation.
        Data here on energy production, use, dependency, and efficiency are compiled by the World Bank from the International Energy Agency and the Carbon Dioxide Information Analysis Center.
        <a target='_blank'
            rel='noopener noreferrer' href="https://data.humdata.org/dataset/world-bank-energy-and-mining-indicators-for-tunisia">Source DataSet</a>
    </Typography>

   <LineChart
      series={[
        { dataKey: 'rural', label: 'Access to electricity, rural (% of rural population)' },
        { dataKey: 'urban',label: 'Access to electricity, urban (% of urban population)' },
        { dataKey: 'Access',label: 'Access to electricity (% of population)' },
       
      ]}
      xAxis={[{ dataKey: 'id'}]}
      {...customize}
      dataset={data}
     
    />
    < Renewable />
    
    </>
  );
}
