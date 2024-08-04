import { Alert, Snackbar } from "@mui/material";
import React from "react";

type FlashProps = {
  isShow: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  onClose: () => void;
};

function Flash({ isShow, message, severity, onClose }: FlashProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      onClose={onClose}
      autoHideDuration={2000}
      sx={{ marginTop: 6, marginRight: -2 }}
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Flash;
