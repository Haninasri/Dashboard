import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase";
import {useEffect ,useState} from "react";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [row, setRow] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      const admins = await getDocs(collection(db, "Invoices"));
      admins.forEach((admin) => {
        console.log(admin.data());
        setRow((r) => ([
          ...r,
          {
              id: admin.data().Id,
              name: admin.data().Name,
              email: admin.data().Email,
              phone: admin.data().Phone,
              Cost: admin.data().Cost,
              Date: admin.data().Date,
          },
      ]));
      });
    };

    getAdmins();
  }, []);

  console.log("row", row);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "Cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.Cost}
        </Typography>
      ),
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
        }}
      >
        <DataGrid checkboxSelection rows={row} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;