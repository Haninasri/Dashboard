import { Box } from "@mui/material";
import Header from "../../components/Header";
import ExPort from "../../components/export";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import {Typography} from "@material-ui/core"

const Export = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Tunisia Imports and Exports" />
      <Typography variant="h6" color={colors.grey[100]}>
      Tunisia's import and export dynamics in the energy sector reflect its efforts to balance domestic demand with external dependencies while also aiming for energy security and sustainability.
        <a target='_blank'
            rel='noopener noreferrer' href="https://data.humdata.org/dataset/world-bank-energy-and-mining-indicators-for-tunisia">Source DataSet</a>
    </Typography>
      <Box height="75vh">
        <ExPort />
      </Box>
    </Box>
  );
};

export default Export;
