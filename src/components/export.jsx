import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from "@mui/material";
const chartSetting = {
    yAxis: [
      {
        label: '% of merchandise',
      },
    ],
    legend: { hidden: true },
    height: 500,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  const valueFormatter = (value) => `${value}%`;



function ExPort() {
    const [row, setRow] = useState([]);
    
    useEffect(() => {
        const getAdmins = async () => {
          const admins = await getDocs(collection(db, "Energy"));
          admins.forEach((admin) => {
            console.log(admin.data());
            setRow((r) => ([
              ...r,
              {
                id: admin.data().yearImport,
                yearImport: admin.data().yearImport,
                value: admin.data().q,
                value1: admin.data().r,
                value2: admin.data().s,
                value3: admin.data().t,
                  
              },
          ]));
          });
        };
    
        getAdmins();
      }, []);
      //console.log('row',row)
      // const Accc = row.filter(en =>
      //  en.indicatorName === 'Access to electricity, urban (% of urban population)'
      //);
      const data =row.sort((a, b) => (a.id > b.id) ? 1 : -1)
      console.log('Data',data)
  return (
        <Box
        display="line"
        column-gap= '10px'
        padding= "10px"
        >
          <Box
          column-gap= '10px'
          padding= "10px"
          
          >
          <BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'yearImport' }]}
      series={[
        
        { dataKey: 'value2', label: 'Fuel exports (% of merchandise exports)', valueFormatter },
        { dataKey: 'value', label: 'Fuel imports (% of merchandise imports)', valueFormatter },
        { dataKey: 'value3', label: 'Ores and metals exports (% of merchandise exports)', valueFormatter },
        { dataKey: 'value1', label: 'Ores and metals imports (% of merchandise imports)', valueFormatter },
        
      ]}
      {...chartSetting}
    />
    </Box>
    </Box>
  )
}

export default ExPort