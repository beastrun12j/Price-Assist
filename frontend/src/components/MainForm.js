import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup as MuiRadioGroup,
  Select,
  Stack,
  TextField
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { carModels, carTypeItems, getFuelTypes, getSellerTypes } from "../data/utils";
import Controls from "./Form/Controls";

const validationSchema = yup.object({
  vehicleAge: yup
    .number("")
    .required("This field is required!")
    .test("Is valid?", "Not a valid value", (value) => value > 0 && value < 50),
  distanceTravelled: yup
    .number()
    .required("This field is required!")
    .test(
      "Is valid?",
      "Not a valid value",
      (value) => value > 0 && value < 10000000
    ),
  engineSize: yup
    .number()
    .required("This field is required!")
    .test(
      "Is valid?",
      "Not a valid value",
      (value) => value > 0 && value < 4000
    ),
  mileage: yup
    .number()
    .required("This field is required!")
    .test("Is valid?", "Not a valid value", (value) => value > 0 && value < 50),
  maxPower: yup
    .number()
    .required("This field is required!")
    .test(
      "Is valid?",
      "Not a valid value",
      (value) => value > 0 && value <= 1000
    ),
  seatType: yup
    .number()
    .required("This field is required!")
    .test(
      "Is valid?",
      "Not a valid value",
      (value) => value > 0 && value <= 20
    ),
});

function MainForm(props) {
  const [fetch, setFetch] = useState(false);
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await axios.get(
          "https://price-assist-backend.herokuapp.com/prediction/"
        );
        const data = await result.data;
        props.prediction(data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchDetails();
    props.isLoading(false);
    setFetch(false);
    // eslint-disable-next-line
  }, [fetch]);

  const formik = useFormik({
    initialValues: {
      carModel: carModels[0].label,
      vehicleAge: "",
      distanceTravelled: "",
      engineSize: "",
      mileage: "",
      maxPower: "",
      transmissionType: "Automatic",
      sellerType: "Dealer",
      fuelType: "CNG",
      seatType: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.isLoading(true);
      props.isEmpty(false);
      sendData(values);
      formik.resetForm();
      setFetch(true);
    },
  });

  const sendData = (values) => {
    axios.post("https://price-assist-backend.herokuapp.com/prediction/", {
      carModel: values.carModel,
      vehicleAge: values.vehicleAge,
      distanceTravelled: values.distanceTravelled,
      engineSize: values.engineSize,
      mileage: values.mileage,
      maxPower: values.maxPower,
      transmissionType: values.transmissionType,
      sellerType: values.sellerType,
      fuelType: values.fuelType,
      seatType: values.seatType,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper style={{ margin: "40px", padding: "24px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={6} sx={{ flexDirection: { xs: "column", md: "row"}, width: {xs: "100%"}}} >
            <Grid item xs={largeScreen ? 6 : 12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={carModels}
                onChange={(_event, newValue) => {
                  if (newValue) formik.values.carModel = newValue.label;
                  else formik.values.carModel = "";
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Car Model"
                    fullWidth
                    name="carModel"
                    required
                  />
                )}
              />
              <TextField
                label="Vehicle Age (In years)"
                name="vehicleAge"
                value={formik.values.vehicleAge}
                onChange={formik.handleChange}
                error={
                  formik.touched.vehicleAge && Boolean(formik.errors.vehicleAge)
                }
                helperText={
                  formik.touched.vehicleAge && formik.errors.vehicleAge
                }
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                type="number"
                color="primary"
              />
              <TextField
                label="Distance travelled (In km)"
                name="distanceTravelled"
                value={formik.values.distanceTravelled}
                onChange={formik.handleChange}
                error={
                  formik.touched.distanceTravelled &&
                  Boolean(formik.errors.distanceTravelled)
                }
                helperText={
                  formik.touched.distanceTravelled &&
                  formik.errors.distanceTravelled
                }
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                type="number"
                color="primary"
              />
              <TextField
                label="Engine Size (In cc)"
                name="engineSize"
                value={formik.values.engineSize}
                onChange={formik.handleChange}
                error={
                  formik.touched.engineSize && Boolean(formik.errors.engineSize)
                }
                helperText={
                  formik.touched.engineSize && formik.errors.engineSize
                }
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                type="number"
                color="primary"
              />
              <TextField
                label="Mileage (In km/l)"
                name="mileage"
                value={formik.values.mileage}
                onChange={formik.handleChange}
                error={formik.touched.mileage && Boolean(formik.errors.mileage)}
                helperText={formik.touched.mileage && formik.errors.mileage}
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                type="number"
                color="primary"
              />
              <TextField
                label="Max Power (In bhp)"
                name="maxPower"
                value={formik.values.maxPower}
                onChange={formik.handleChange}
                error={
                  formik.touched.maxPower && Boolean(formik.errors.maxPower)
                }
                helperText={formik.touched.maxPower && formik.errors.maxPower}
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                type="number"
                color="primary"
              />
            </Grid>
            <Grid item xs={largeScreen ? 6 : 12}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <MuiRadioGroup
                    name="transmissionType"
                    value={formik.values.transmissionType}
                    onChange={formik.handleChange}
                    row
                    color="primary"
                    required
                  >
                    {carTypeItems.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.title}
                        control={<Radio />}
                        label={item.title}
                      />
                    ))}
                  </MuiRadioGroup>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel>Seller</InputLabel>
                  <Select
                    name="sellerType"
                    label="Seller"
                    value={formik.values.sellerType}
                    onChange={formik.handleChange}
                    color="primary"
                    fullWidth
                  >
                    {getSellerTypes().map((item) => (
                      <MenuItem key={item.id} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel>Fuel</InputLabel>
                  <Select
                    name="fuelType"
                    label="Fuel"
                    variant="outlined"
                    value={formik.values.fuelType}
                    onChange={formik.handleChange}
                    color="primary"
                    fullWidth
                  >
                    {getFuelTypes().map((item) => (
                      <MenuItem key={item.id} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="No. of seats"
                  name="seatType"
                  value={formik.values.seatType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.seatType && Boolean(formik.errors.seatType)
                  }
                  helperText={formik.touched.seatType && formik.errors.seatType}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "10px" }}
                  type="number"
                  color="primary"
                />
                <div style={{ paddingTop: "24px" }}>
                  <Controls.Button type="submit" text="Submit" />
                  <Controls.Button
                    text="Reset"
                    onClick={(_e) => formik.resetForm()}
                  />
                </div>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default MainForm;
