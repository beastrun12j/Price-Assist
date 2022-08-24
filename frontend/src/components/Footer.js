import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" style={{ color: "white" }}>
        {"Copyright © "}
        <Link href="#" style={{ color: "white" }}>
          Price Assist 2022
        </Link>
      </Typography>
    </div>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Container
        component="main"
        sx={{ mt: 8, mb: 2 }}
        maxWidth="sm"
      ></Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "black",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1"></Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
