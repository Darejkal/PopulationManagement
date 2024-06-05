import { ListedView } from "../component/ListedView";
import { useState } from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  displayColumnDefOptions,
} from "material-react-table";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { palette } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
export const HouseholdForm = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/listFamily");
  };

  const initialFields = {
    maHoKhau: "",
    maKhuVuc: "",
    diaChi: "",
    chuHo: "",
  };
  const [fields, setFields] = useState(initialFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", fields);
    // axios.post("hostserver/api/hoKhau/create", {body}, {headers: {"Authorization": "Bearer token"}})
    setFields(initialFields);
  };

  const fieldElements = Object.entries(fields).map(
    ([fieldName, fieldValue]) => (
      <TextField
        key={fieldName}
        label={fieldName}
        onChange={handleChange}
        margin="normal"
        id="outlined-basic"
        variant="outlined"
        fullWidth
        required
      ></TextField>
    )
  );

  const Form = () => {
    return (
      <div>
        <div>
          <h2>Thêm hộ gia đình</h2>
        </div>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, maxWidth: "60%" },
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Mã hộ khẩu"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Mã khu vực"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Chủ hộ"
              variant="outlined"
            />
            <TextField
              required
              disabled
              fullWidth
              id="outlined-disabled"
              label="Số CCCD Chủ hộ"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              disabled
              fullWidth
              id="outlined-disabled"
              label="Ngày sinh Chủ hộ"
              InputProps={{
                readOnly: true,
              }}
            />
          </form>
        </Box>

        <div>Thành viên trong hộ (nháp)</div>

        <div>
          <Button
            variant="contained"
            sx={{ mr: 4, mt: 4, mb: 4 }}
            color="success"
          >
            Lưu
          </Button>
        </div>

        <div></div>

        <div>
          <Button
            variant="outlined"
            sx={{ mr: 4, mb: 4 }}
            onClick={() => handleGoBack()}
          >
            Trở về
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Form></Form>
    </div>
  );
};
