import { ColorModeContext, useMode} from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import TeamManager from "./scenes/team/teamManager";
import Invoices from "./scenes/invoices";
import TunisData from "./scenes/data";
import Export from "./scenes/export";
import Form from "./scenes/form";
import Energy from "./scenes/energy";
import Adjusted from "./scenes/adjusted";
import FAQ from "./scenes/faq";
import Emissions from "./scenes/emissions";
import Calendar from "./scenes/calendar/calendar";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar]= useState(true);
  console.log("env",process.env)

  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar}/>
        <Routes>
        <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/teamManager" element={<TeamManager />} />
              <Route path="/data" element={<TunisData />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/export" element={<Export />} />
              <Route path="/adjusted" element={<Adjusted />} />
              <Route path="/energy" element={<Energy />} />
              <Route path="/geography" element={<Emissions/>} />
               
               
               
              
               

        </Routes>
      </main>
     
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
