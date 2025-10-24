import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type ConfirmPopUpProps = {
  question: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

const ConfirmPopUp = ({
  question,
  isOpen,
  setIsOpen,
  onConfirm,
}: ConfirmPopUpProps) => {

    console.log("confirm pop up component rendered");
    
  function handlePopUpClose(
    _: {},
    reason: "backdropClick" | "escapeKeyDown"
  ): void {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handlePopUpClose}
      sx={{
        "& .MuiDialog-Paper": {
          width: 400,
          height: 300,
        },
      }}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <Typography fontSize={25} fontWeight="bold">
          {question}
        </Typography>
      </DialogContent>
      <DialogActions sx={{display:"flex",justifyContent:"space-evenly",p:2}}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              onConfirm();
            }}
          >
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={()=>setIsOpen(false)}>
            No
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPopUp;
