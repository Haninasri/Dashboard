//import * as React from 'react';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useTheme } from '@mui/material/styles';
//import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};
const data_1 = [
  { Mineral_rents: 0, Natural_gas_rents: 0.490998035,Oil_rents_of_GDP:1.548962101,Total_natural_resources_rents:2.249230874},
  { Mineral_rents:0, Natural_gas_rents: 0.303269987,Oil_rents_of_GDP:0.916677527,Total_natural_resources_rents:1.467172306, },
  { Mineral_rents: 0, Natural_gas_rents: 0.308497306,Oil_rents_of_GDP: 1.661411812,Total_natural_resources_rents:2.247392297,},
  { Mineral_rents: 0, Natural_gas_rents: 0.349896452,Oil_rents_of_GDP:1.990215489,Total_natural_resources_rents:2.821879871,},
  { Mineral_rents: 0.270935085, Natural_gas_rents: 0.23643346,Oil_rents_of_GDP:1.48811485,Total_natural_resources_rents:2.510259727, },
  
];
const data = [
  { label: 'Mineral_rents', value:27.0935085, color: '#0088FE' },
  { label: 'Natural_gas_rents', value:49.0998035 + 30.3269987 + 30.8497306 + 34.9896452 + 23.643346, color: '#00C49F' },
  { label: 'Oil_rents_of_GDP', value: 154.8962101 + 91.6677527 + 166.1411812 + 199.0215489+148.811485 , color: '#FFBB28' },
  { label: 'Total_natural_resources_rents', value: 224.9230874 + 146.7172306+224.7392297+282.1879871+251.0259727, color: '#FF8042' },
];
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};


export default function Piechart() {
  console.log("data",data)
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
