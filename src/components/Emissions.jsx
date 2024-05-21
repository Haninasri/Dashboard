import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../theme.js";
import { useTheme } from "@emotion/react";
import {Typography} from "@material-ui/core"
import Header from "./Header.jsx";
import LineChart1 from "./test.jsx"




const customize_line = {
  height: 300,
  width: 400,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
  
};
const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'year', headerName: 'Year', width: 90,type: 'number', },
  {
    field: 'mineral$',
    headerName: 'Mineral depletion(current US$)',
    width: 200,
    editable: false,
    type: 'number',
  },
  {
    field: 'energy$',
    headerName: 'Energy depletion (current US$)',
    width: 200,
    editable: false,
    type: 'number',
  },
  {
    field: 'mineralGNI',
    headerName: 'Mineral depletion (% of GNI)',
    width: 200,
    editable: false,
    type: 'number',
  },
  {
    field: 'energyGNI',
    headerName: 'Energy depletion (% of GNI)',
    with: 200,
    editable :false,
    type : 'number',
  },
  {
    field: 'naturalGNI',
    headerName: 'Natural resources depletion (% of GNI)',
    width: 200,
    editable: false,
    type: 'number',
   
  },
];
const rows = [
  { id: 1, year: '2017', mineral$: 76485185.3, energy$: 432663157.4,mineralGNI:0.185772212,energyGNI:1.050880524,naturalGNI:1.614708992},
  { id: 2, year: '2018', mineral$: 69393832.38, energy$: 586701313,mineralGNI:0.166612878,energyGNI:1.408655363,naturalGNI:1.784576158, },
  { id: 3, year: '2019', mineral$: 69393832.38, energy$: 464950788.6,mineralGNI:0.166612878,energyGNI: 1.139199137,naturalGNI:1.415806548,},
  { id: 4, year: '2020', mineral$: 69393832.38, energy$: 278591456,mineralGNI:0.166612878,energyGNI:0.67716052,naturalGNI:0.925890815,},
  { id: 5, year: '2021', mineral$: 69393832.38, energy$: 529385779.9,mineralGNI:0.166612878,energyGNI:1.172572012,naturalGNI:1.383147006, },
  
];
const customize_3 = {
  height: 500,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
  
};
const Discount_Rate = 0.08;
const discounted = rows.map(obj => {
  const id = parseFloat(obj.year)
  const mineral= parseFloat(obj.mineral$) /(1+Discount_Rate )^1
  const energy$ = (parseFloat(obj.energy$)/(1+Discount_Rate )^1)
  const mineralGNI = (parseFloat(obj.mineralGNI)/(1+Discount_Rate )^1)
  const energyGNI = (parseFloat(obj.energyGNI)/(1+Discount_Rate )^1)
  const naturalGNI = (parseFloat(obj.naturalGNI)/(1+Discount_Rate )^1)
  return { id,mineral, energy$, mineralGNI, energyGNI, naturalGNI,dicounted_dollar:(mineral + energy$ )/2,discounted_GNI:(mineralGNI + energyGNI + naturalGNI)/3}
 })
 console.log('discounted',discounted)
const chartSetting = {
    yAxis: [
      {
        label: 'Emissions in Energy Sector ',
        fontSize : 12,
      },
    ],
    legend: { hidden: true },
    height: 300,
    width: 400,

    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  const chartSetting_1 = {
    yAxis: [
      {
        label: 'Emissions in Energy Sector % ',
      },
    ],
    legend: { hidden: true },
    height: 300,
    width: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  const valueFormatter = (value) => `${value}ktǂ`;
  const valueFormatter_1 = (value) => `${value}%`;



function EmissIons ()  {
    const [row, setRow] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    useEffect(() => {
        const getAdmins = async () => {
          const admins = await getDocs(collection(db, "Energy-1"));
          admins.forEach((admin) => {
            console.log(admin.data());
            setRow((r) => ([
              ...r,
              {
                id: admin.data().yearEmmission,
                yearEmmission: admin.data().yearEmmission,
                value: admin.data().a,
                value1: admin.data().b,
                value2: admin.data().c,
                value3: admin.data().d,
                value4: admin.data().e,
                value5: admin.data().f,
                  
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
      const data_1= data.map(obj => {
        const id = parseFloat(obj.yearEmmission)
        const A= parseFloat(obj.value)
        return { id,A}
       })
       console.log('discounted',data_1)
  return ( 
    <div>
      <Header title="Emissions in Energy Sector Chart" subtitle="Tunisia" />
       <Box 
       display="flex"
       column-gap= '10px'
       padding= "10px"
       >
        <BarChart
      dataset={data}
      xAxis={[{ 
        scaleType: 'band', 
        dataKey: 'yearEmmission',
      }]}
      series={[
        
        { dataKey: 'value', label: 'Methane emissions in energy sector (thousand metric tons of CO2 equivalent)', valueFormatter },
        { dataKey: 'value4', label: 'Nitrous oxide emissions in energy sector (thousand metric tons of CO2 equivalent)', valueFormatter },
        
      ]}
      {...chartSetting}
    />
     <BarChart
      dataset={data}
      xAxis={[{ 
        scaleType: 'band', 
        dataKey: 'id' ,
        min: 1990,
        max: 2022,
        //valueFormatter: (value) => value.toString(),
      }]}
      series={[
        { dataKey: 'value1', label: 'CO2 emissions from gaseous fuel consumption (% of total)', valueFormatter_1 },
        { dataKey: 'value3', label: 'Energy related methane emissions (% of total)', valueFormatter_1 },
        { dataKey: 'value5', label: 'Nitrous oxide emissions in energy sector (% of total)', valueFormatter_1 },
        
      ]}
      {...chartSetting_1}
    />
    </Box>
    <Box
    display="flex"
    column-gap= '10px'
    padding= "10px"
    >
       <LineChart
      series={[
        { dataKey: 'value2',label: 'CO2 emissions from liquid fuel consumption (kt)',valueFormatter },
       
      ]}
      xAxis={[{ 
        dataKey: 'id',
        min: 1990,
        max: 2022,
        valueFormatter: (value) => value.toString(),
      }]}
      {...customize_line}
      dataset={data}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
      
     
    />
    <LineChart
      series={[
        
        { dataKey: 'value',label: 'Methane emissions in energy sector (thousand metric tons of CO2 equivalent)',valueFormatter_1 },
       
      ]}
      xAxis={[{ 
        dataKey: 'id',
        min: 1990,
        max: 2022,
        valueFormatter: (value) => value.toString(),
        
      }]}
      {...customize_line}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
      dataset={data} />
       

      </Box>
      
    </div>
   
  )
}

export default EmissIons