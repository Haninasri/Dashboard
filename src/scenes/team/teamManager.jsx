import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase";
import { Box } from "@mui/material";
const TeamManager = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [age, setAge] = useState()
    const [access, setAccess] = useState()
    const dbref = collection(db, 'React-app')
    
 
    const handleSubmit = async (event) => {
        event.preventDefault()
        try 
        {
            await addDoc(dbref, {Name:name, Email:email, Addres:address, Phone:phone, Age:age, Access:access})
            alert("Data added Successfully")
        } 
        catch (error) {
            alert(error)
            
        }
 
    }
     
    return ( 
        <Box>

        
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Login Form</h2>
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
                    label="Adress"
                    onChange={e => setAddress(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={address}
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
                    label="Age"
                    onChange={e => setAge(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="age"
                    value={age}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <TextField 
                    label="Access"
                    onChange={e => setAccess(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="access"
                    value={access}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">SEND</Button>
             
        </form>
        <small>Need To Team Information <Link to="/team">Click here</Link></small>
        </React.Fragment>
       
        </Box>
     );
}
 
export default TeamManager;