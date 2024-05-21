import { Box} from "@mui/material";
import Header from "../../components/Header";
import EnerGy from "../../components/energy";




const Energy = () => {
  return (
    <Box m="20px">
      <Header title="Energy Chart" subtitle="Access to electricity Chart" />
      <Box height="75vh">
        <EnerGy />
      </Box>
    </Box>
  );
};

export default Energy;