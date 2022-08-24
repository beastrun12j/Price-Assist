import { CircularProgress, Container, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const ResultCard = (props) => {
  const { predictionValue, isLoading, isEmpty } = props;
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  if (!isEmpty) {
    return (
      <Container
        style={{
          width: largeScreen ? "45%" : "80%",
          height: "75px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#3f51b5",
          borderRadius: "10px",
          color: "white",
        }}
      >
        {isLoading && <CircularProgress color="secondary" />}
        {!isLoading && predictionValue > 0 && (
          <>
            <Typography
              variant="h5"
              style={{ textAlign: "center", padding: "4px" }}
            >
              Best price available :{" "}
            </Typography>
            <Typography
              variant="h5"
              style={{ textAlign: "center", padding: "4px" }}
            >
              ₹ {predictionValue}
            </Typography>
          </>
        )}
        {!isLoading && predictionValue <= 0 && (
          <Typography
            variant="h5"
            style={{ textAlign: "center", padding: "4px" }}
          >
            No prices available for this car
          </Typography>
        )}
      </Container>
    );
  }
};

export default ResultCard;
