import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios"; // Make sure to install axios
import { ToastContainer, toast, useToastContainer } from "react-toastify";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const titleStyle = {
  backgroundColor: "lightgray",
  borderRadius: "4px",
  padding: "8px 16px",
  textAlign: "center",
  marginBottom: "16px",
  marginTop: "16px",
};

export default function AddStudentModal({
  isEditMode,
  studentData,
  onSuccess,
  setIsEditMode,
  onClose,
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [marks, setMarks] = React.useState("");

  // Handle the modal open state properly when switching between modes
  React.useEffect(() => {
    if (isEditMode) setOpen(true);
    else setOpen(false);
  }, [isEditMode]);

  React.useEffect(() => {
    if (isEditMode && studentData) {
      setName(studentData.name || "");
      setSubject(studentData.subject || "");
      setMarks(studentData.marks || "");
    }
  }, [studentData, isEditMode]);

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false); // Reset edit mode
    onClose(); // Close callback
    setName("");
    setSubject("");
    setMarks("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditMode && studentData?.id) {
        await axios.put(
          `http://172.16.20.61:3003/student/updatestudent/${studentData.id}`,
          {
            name,
            subject,
            marks,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`, // This is the headers
            },
          }
        );
      } else {
        await axios.post(
          "http://172.16.20.61:3003/student/studentsinsertion",
          { name, subject, marks }, // This is the data to send
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`, // This is the headers
            },
          }
        );
      }

      onSuccess(); // Refresh data in parent
      handleClose(); // Close modal after successful operation
    } catch (error) {
      console.error("There was an error posting the data!", error);
    }
  };

  return (
    <div>
      {!isEditMode && (
        <Button
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#333",
            },
            mt: 2,
          }}
        >
          Add Student
        </Button>
      )}
      <Modal
        open={open || isEditMode} // Open modal based on state or edit mode
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={titleStyle}
          >
            {isEditMode ? "Update Student" : "Add New Student"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="marks"
              label="Marks"
              name="marks"
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#000",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              {isEditMode ? "Update" : "Add"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
