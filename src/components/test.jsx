import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { LineChart, axisClasses } from '@mui/x-charts';
import { useTheme } from '@mui/material/styles';
//import * as React from 'react';



function Test  () {
    const [row, setRow] = useState([]);
    const theme = useTheme();
   
    
    useEffect(() => {
        const getAdmins = async () => {
          const admins = await getDocs(collection(db, "Energy-1"));
          admins.forEach((admin) => {
            console.log(admin.data());
            setRow((r) => ([
              ...r,
              {
                id: admin.data().yearEnergy,
                yearEnergy: admin.data().yearEnergy,
                value2: admin.data().m,
                value3: admin.data().n,
                value4: admin.data().o,
                value5: admin.data().p,
                  
              },
          ]));
          });
        };
    
        getAdmins();
      }, []);
      console.log('data',row)
      {/*const data_1= row.map(obj => {
        const id = parseFloat(obj.yearEnergy)
        const A= parseFloat(obj.value)
        return { id,A}
       })*/}
       //console.log('discounted',data)
       const data =row.sort((a, b) => (a.id > b.id) ? 1 : -1)
       console.log('dsicounted',data)

    
  return (
    
        <LineChart
          dataset={data}
          margin={{
            top: 20,
            right: 20,
            left: 50,
            bottom: 20,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'id',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
              min: 1971,
              max: 2022,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 20,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'value2',
              showMark: false,
              color: theme.palette.error.dark,
            },
            {
                dataKey: 'value3',
                showMark: false,
                color: theme.palette.info.light,
              },
              {
                dataKey: 'value4',
                showMark: false,
                color: theme.palette.warning.main,
              },
              {
                dataKey: 'value5',
                showMark: false,
                color: theme.palette.success.main,
              },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
        )}

export default Test