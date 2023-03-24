import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import API from "../../config/axiosConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const payload = {
      type: form.get("type"),
      feed: form.get("feed"),
    };
    const response = await API.get("feed/create", { params: payload });
    props.onCreate(response.data.feed);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add Feed
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Create Feed
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              name="type"
              label="Type"
              fullWidth
              defaultValue="keyword"
            >
              <MenuItem value="keyword">Keyword</MenuItem>
              <MenuItem value="category">Category</MenuItem>
              <MenuItem value="source">Source</MenuItem>
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              name="feed"
              label="Feed"
              id="feed"
              autoComplete="feed"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
