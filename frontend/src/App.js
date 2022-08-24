import React from "react";
import "./App.css";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MainForm from "./components/MainForm";
import StickyFooter from "./components/Footer";
import ResultCard from "./components/PredictionCard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

function App() {
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(true);

  const predictionHandler = (prediction) => {
    setPrediction(prediction);
  };

  const loadingHandler = (loading) => {
    setLoading(loading);
  };

  const emptyHandler = (empty) => {
    setEmpty(empty);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Banner />
      <MainForm
        prediction={predictionHandler}
        isLoading={loadingHandler}
        isEmpty={emptyHandler}
      />
      <CssBaseline />
      <ResultCard
        predictionValue={prediction.prediction}
        isLoading={loading}
        isEmpty={empty}
      />
      <StickyFooter />
    </ThemeProvider>
  );
}

export default App;
