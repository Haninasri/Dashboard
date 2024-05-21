import { Box, useTheme } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase";
import React, {useState} from "react";
import { Link } from "react-router-dom"


const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState()
  const [cost, setCost] = useState()
  const [date, setDate] = useState()
  const dbref = collection(db, 'Invoices')
  const handleSubmit = async (event) => {
    event.preventDefault()
    try 
    {
        await addDoc(dbref, {Id:id, Name:name, Email:email, Phone:phone, Cost:cost, Date:date})
        alert("Data added Successfully")
    } 
    catch (error) {
        alert(error)
        
    }

}
  
  return (
    <Box m="20px">
      <Header title="Form" subtitle="List of Invoice Balances" />
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
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Login Form</h2>
            <TextField 
                    label="ID"
                    onChange={e => setId(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={id}
                 />
                <TextField 
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={name}
                 />
                  <TextField 
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                 />
                 
                 <TextField 
                    label="Phone"
                    onChange={e => setPhone(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="phone"
                    value={phone}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <TextField 
                    label="Cost"
                    onChange={e => setCost(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="cost"
                    value={cost}
                    fullWidth
                    sx={{mb: 3,
                      
                    }}
                 />
                 <TextField 
                    label="Date"
                    onChange={e => setDate(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="access"
                    value={date}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">SEND</Button>
             
        </form>
        <small>Need To Team Information <Link to="/team">Click here</Link></small>
        </React.Fragment>
      </Box>
    </Box>
  );
};

export default Form;
