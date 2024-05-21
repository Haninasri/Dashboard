import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
import {Typography} from "@material-ui/core"
import Header from "../components/Header";

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
 console.log('Discouned Rate',discounted)
const chartSetting = {
    yAxis: [
      {
        label: 'Adjusted Savin on current US$',
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
        label: 'Adjusted Savin GNI of % ',
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
  const valueFormatter = (value) => `${value}US$`;
  const valueFormatter_1 = (value) => `${value}%`;



function AdjusTed ()  {
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
                id: admin.data().yearImport,
                yearEnergy: admin.data().yearEnergy,
                yearAdjusted: admin.data().yearAdjusted,
                value5: admin.data().i,
                value6: admin.data().j,
                value7: admin.data().k,
                value8: admin.data().l,
                value9: admin.data().value,
                  
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
      const data_1 =row.sort((a, b) => (a.yearAdjusted > b.yearAdjusted) ? 1 : -1)
      console.log('Data_1',data_1)
  return ( 
    <div>
      <Header title="Bar Chart" subtitle="Tunisia Adjusted savings" />
       <Box 
       display="flex"
       column-gap= '10px'
       padding= "10px"
       >
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'yearEnergy' }]}
      series={[
        
        { dataKey: 'value5', label: 'Adjusted savings: mineral depletion (current US$)', valueFormatter },
        { dataKey: 'value6', label: 'Adjusted savings: energy depletion (current US$)', valueFormatter },
        
      ]}
      {...chartSetting}
    />
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'yearEnergy' }]}
      series={[
        { dataKey: 'value7', label: 'Adjusted savings: energy depletion (% of GNI)', valueFormatter_1 },
        { dataKey: 'value8', label: 'Adjusted savings: natural resources depletion (% of GNI)', valueFormatter_1 },
        
      ]}
      {...chartSetting_1}
    />
    </Box>
    <Header title="Table" subtitle="Tunisia's Adjusted savings for the last 5 years" />
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    <Box
    display="flex"
    column-gap= '10px'
    padding= "10px">
      <BarChart
      dataset={discounted}
      xAxis={[{ scaleType: 'band', dataKey: 'id' }]}
      series={[
        { dataKey: 'mineral', label: 'Discounted Value: mineral depletion (Current US-$)', valueFormatter },
        { dataKey: 'energy', label: 'Discounted Value: energy  depletion (Current US-$)', valueFormatter },
        
      ]}
      {...chartSetting} />
      <BarChart
      dataset={discounted}
      xAxis={[{ scaleType: 'band', dataKey: 'id' }]}
      series={[
        { dataKey: ' mineralGNI', label: 'Dicounted Value for Mineral depletion (% of GNI)',valueFormatter_1 },
        { dataKey: 'energyGNI',label: 'Dicounted Value for Energy depletion (% of GNI)',valueFormatter_1 },
        { dataKey: 'naturalGNI',label: 'Dicounted Value for Natural resource depletion (% of GNI)',valueFormatter_1 },
        
      ]}
      {...chartSetting_1} />

    </Box>
    <Box
    display="flex"
    column-gap= '10px'
    padding= "10px"
    >
    <LineChart
      series={[
        { dataKey: 'dicounted_dollar',label: 'Dicounted Value of total discounted for the last five years (Current US $)',valueFormatter },
       
      ]}
      xAxis={[{ dataKey: 'id'}]}
      {...customize_line}
      dataset={discounted}
     
    />
    <LineChart
      series={[
        
        { dataKey: 'discounted_GNI',label: 'Dicounted Value of total discounted for the last five years (% of GNI)',valueFormatter_1 },
       
      ]}
      xAxis={[{ dataKey: 'id'}]}
      {...customize_line}
      dataset={discounted} />
    </Box>
    
    <LineChart
      series={[
        
        { dataKey: 'value9',label: 'Adjusted savings: mineral depletion (% of GNI)',valueFormatter_1 },
       
      ]}
      xAxis={[{ 
        dataKey:'yearAdjusted',
        valueFormatter: (value) => value.toString(),
        min: 1970,
        max: 2020,
      }]}
      {...customize_3}
      dataset={data_1} />
      <Box component="section" sx={{  
        p: 2, 
        border: '1px dashed grey',
        textAlign:'justify', 
        fontSize:'5',
        fontFamily:'sans-serif',
        fontStyle:'italic' }}
        >
      <Typography  color={colors.grey[100] }>
      
      <p>Adjusted savings: mineral depletion (% of GNI) in Tunisia was 0.00 as of 2019. Its highest value over the past 49 years was 2.87 in 2008, while its lowest value was 0.00 in 2002.</p>
    <p>
      Adjusted net savings, also known as genuine savings, is a measure of the true rate of savings in an economy after accounting for investments in human capital, depletion of natural resources, and damage caused by pollution. For Tunisia, the data on adjusted net savings over the last five years can be summarized as follows:
      <br/>- 2018: Adjusted net savings were around -1.2% of Gross National Income (GNI). This negative value indicates that the country's savings were insufficient to cover depreciation and the depletion of natural resources.
      <br/>- 2019: The adjusted net savings remained in negative territory at -1.0% of GNI.
      <br/>- 2020: Due to the economic impacts of the COVID-19 pandemic, Tunisia's adjusted net savings dropped further to -3.5% of GNI.
      <br/>- 2021: There was a slight improvement as the economy started to recover, with adjusted net savings at -2.9% of GNI.
      <br/>- 2022: Adjusted net savings continued to show signs of recovery but remained negative at -2.5% of GNI.
      <br/>These figures reflect the challenges Tunisia faces in terms of sustainable development, particularly regarding the depletion of natural resources and the need for greater investments in human capital and pollution control.</p>
</Typography>
</Box>
    </div>
   
  )
}

export default AdjusTed