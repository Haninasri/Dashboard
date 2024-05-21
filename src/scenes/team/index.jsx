import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import {useEffect ,useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
//import TunisData from "./tunisData"



const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [row, setRow] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      const admins = await getDocs(collection(db, "React-app"));
      admins.forEach((admin) => {
        console.log(admin.data());
        setRow((r) => ([
          ...r,
          {
              id: admin.data().Name,
              name: admin.data().Name,
              email: admin.data().Email,
              phone: admin.data().Phone,
              addres: admin.data().Addres,
              age: admin.data().Age,
              access: admin.data().Access,
              updatedByEmail: admin.data().updatedByEmail,
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
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
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
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "Admin"
                ? colors.greenAccent[600]
                : access === "Manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "Manager" && <SecurityOutlinedIcon />}
            {access === "User" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid  
        rows={row} 
        columns={columns}  
        //getRowId={(row:any) => row.id}
        //pageSize={10}
        //rowsPerPageOptions={[10]}
        />
      </Box>
      
    </Box>
  );
};

export default Team;