import { Box} from "@mui/material";
import Header from "../../components/Header";
import EmissIons from "../../components/Emissions";
import Piechart from "../../components/PieChart";




const Emissions = () => {
  return (
    <Box m="20px">
      <Box height="75vh">
        <EmissIons/>
      </Box>
    </Box>
  );
};

export default Emissions;