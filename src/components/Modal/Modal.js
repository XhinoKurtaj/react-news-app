import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

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
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      type: form.get("type"),
      feed: form.get("feed"),
    };
    try {
      const response = await API.get("feed/create", { params: payload });
      props.onCreate(response.data.feed);
      setLoading(false);
      handleClose();
    } catch (e) {
      setLoading(false);
    }
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
            <LoadingButton
              type="submit"
              fullWidth
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
