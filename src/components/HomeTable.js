import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import AddStudentModal from "./AddStudentsModal"; // Ensure this is correctly imported
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "subject", label: "Subject", minWidth: 100 },
  { id: "marks", label: "Marks", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 50 },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const fetchStudents = () => {
    axios
      .get("http://172.16.20.61:3003/student/allstudents", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Include the JWT token in headers
        },
      })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Set the selected row for editing
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditMode(true); // Open modal in edit mode
    handleMenuClose();
  };
  const showDeleteConfirmation = () => {
    const CustomToast = ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete?</p>
        <button
          onClick={() => {
            // Handle the delete logic
            toast.dismiss();
            toast.success("Item deleted successfully.");
          }}
          style={{
            marginRight: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            // Close the toast without any action
            toast.dismiss();
          }}
          style={{
            backgroundColor: "gray",
            color: "white",
            border: "none",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          No
        </button>
      </div>
    );

    // Trigger the custom toast
    toast(<CustomToast />);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://172.16.20.61:3003/student/deletestudent/${selectedRow.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Include the JWT token in headers
          },
        }
      );
      fetchStudents(); // Refresh the table data after deletion
      toast.success("Student deleted successfully.", {
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.", {
        autoClose: 1500,
      });
    }
    handleMenuClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModalClose = () => {
    setIsEditMode(false);
    setSelectedRow(null); // Clear the selected row after editing is complete
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: { xs: "10px", sm: "20px", md: "30px" },
      }}
    >
      <Paper
        sx={{
          width: "100%",
          overflowX: "auto",
          boxShadow: "none",
        }}
      >
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "center"}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "lightgray",
                      fontWeight: "bold",
                      borderRight: "2px solid #e0e0e0",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow role="checkbox" tabIndex={-1} key={index}>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.subject}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.marks}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <IconButton
                        aria-controls={`menu-${index}`}
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={`menu-${index}`}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <AddStudentModal
        isEditMode={isEditMode}
        studentData={selectedRow}
        onSuccess={fetchStudents}
        setIsEditMode={setIsEditMode}
        onClose={handleModalClose}
      />
    </Box>
  );
}
