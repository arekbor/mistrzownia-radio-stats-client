import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";

const Error = ({ error }: { error: AxiosError<string, any> }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    window.location.assign(window.location.origin);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "dark",
          border: "2px solid white",
          boxShadow: 24,
          p: 4,
          color: "red",
        }}
      >
        <Grid container>
          <Grid xs={12}>
            <Typography variant="h4">Error</Typography>
          </Grid>
          <Grid xs={12}>
            <div>Message: {error.message}</div>
            {error.status && <div>Status: {error.status}</div>}
            {error.response?.data && <div>Data: {error.response?.data}</div>}
          </Grid>
          <Grid xs={12} marginTop={5}>
            <Button onClick={handleClose} variant={"contained"}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default Error;
