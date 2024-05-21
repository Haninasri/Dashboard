import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useTheme } from "@mui/material";
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import {Typography} from "@material-ui/core"
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const columns = [
  { field: "id", headerName: "Id", width: 60 },
  { field: "Country_Name", headerName: "Country_Name", width: 100 },
  { field: "Year", headerName: "Year", width: 60 },
  { field: "Indicator_Name", headerName: "Indicator_Name:", width: 400 },
  { field: "Indicator_Code", headerName: "Indicator_Code", width: 160 },
  { field: "Value", headerName: "Value", width: 160 },

];

const TunisData = () => {
  const [row, setRow] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const getAdmins = async () => {
      const admins = await getDocs(collection(db, "Data"));
      admins.forEach((admin) => {
        console.log(admin.data());
        setRow((r) => ([
          ...r,
          {
              id: admin.data().year,
              Country_Name:admin.data().countryName,
              Country_ISO3:admin.data().countryIso3,
              Year:admin.data().year,
              Indicator_Name:admin.data().indicatorName,
              Indicator_Code:admin.data().indicatorCode,
              Value:admin.data().value,
              
          },
      ]));
      });
    };

    getAdmins();
  }, []);

  //console.log("row", row);

  return (
    <Box m='20px'>
    <Header
    title="Data"
    subtitle="Tunisia - Energy and Mining"
  />
  <Typography variant="h6" color={colors.grey[100]}>
        The Tunisian economy needs ever-increasing amounts of energy to sustain economic growth, raise living standards, and reduce poverty. In this example we analysis some data for Tunisian energy  to explain our economy situation.
        Data here on energy production, use, dependency, and efficiency are compiled by the World Bank from the International Energy Agency and the Carbon Dioxide Information Analysis Center.
        <a target='_blank'
            rel='noopener noreferrer' href="https://data.humdata.org/dataset/world-bank-energy-and-mining-indicators-for-tunisia">Source DataSet</a>
    </Typography>
      <Box 
       m="40px 0 0 0"
       height="75vh"
       sx={{
         "& .MuiDataGrid-root": {
           border: "none",
         },
         "& .MuiDataGrid-cell": {
           borderBottom: "none",
         },
         "& .name-column--cell": {
           color: colors.greenAccent[300],
         },
         "& .MuiDataGrid-columnHeaders": {
           backgroundColor: colors.blueAccent[700],
           borderBottom: "none",
         },
         "& .MuiDataGrid-virtualScroller": {
           backgroundColor: colors.primary[400],
         },
         "& .MuiDataGrid-footerContainer": {
           borderTop: "none",
           backgroundColor: colors.blueAccent[700],
         },
         "& .MuiCheckbox-root": {
           color: `${colors.greenAccent[200]} !important`,
         },
         "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
           color: `${colors.grey[100]} !important`,
         },
       }}>
      <DataGrid
        rows={row}
        columns={columns}
        getRowId={(row:any) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
      </Box>
      </Box>
  );
}
export default TunisData