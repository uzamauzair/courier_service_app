import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  TableFooter,
  TablePagination,
  CircularProgress,
  Button,
} from "@mui/material";
import { getShipments, ShipmentData } from "../apiLayers/getShipments";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SearchBarContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end", // Align to the right
  marginBottom: "10px",
  paddingRight: "10px", // Add some right padding
});

const SearchInput = styled("input")({
  width: "300px", // Set a fixed width for the input
  padding: "10px",
  borderRadius: "5px",
  border: "2px solid #6d2828",
});

const LoadingSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token) as JwtPayload;
      if (user) {
        setAuthenticated(true);
      }
    }
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<ShipmentData[]>([]);

  const navigate = useNavigate();
  const handleStatusButtonClick = (row: ShipmentData) => {
    navigate(`/manageStatus/${row.trackingNumber}/${row.status}`);
  };

  useEffect(() => {
    getShipments()
      .then((rows) => {
        setRows(rows);
        setIsLoading(false); // Data has been loaded, set loading to false
      })
      .catch((error: any) => {
        console.error(error);
        setIsLoading(false); // In case of error, set loading to false
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setSearchTerm("");
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setSearchTerm("");
  };

  const filteredRows = rows.filter((row) =>
    row.trackingNumber.toString().includes(searchTerm)
  );

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Shipments Dashboard</h1>
      <div
        style={{
          margin: "2px",
          padding: "10px",
          height: "500px",
          overflow: "auto",
          position: "relative", // Add relative positioning
        }}
      >
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="Track Shipments by Tracking Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBarContainer>
        {isLoading ? (
          <LoadingSpinner size={60} /> // Display loading spinner when isLoading is true
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead style={{ position: "sticky" }}>
                <StyledTableRow>
                  <StyledTableCell>Tracking Number </StyledTableCell>
                  <StyledTableCell>Sender Name</StyledTableCell>
                  <StyledTableCell>Sender Address</StyledTableCell>
                  <StyledTableCell>Recipient Name</StyledTableCell>
                  <StyledTableCell>Recipient Address</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Manage Status</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.trackingNumber}>
                      <StyledTableCell component="th" scope="row">
                        {row.trackingNumber}
                      </StyledTableCell>
                      <StyledTableCell>{row.senderName}</StyledTableCell>
                      <StyledTableCell>{row.senderAddress}</StyledTableCell>
                      <StyledTableCell>{row.recipientName}</StyledTableCell>
                      <StyledTableCell>{row.recipientAddress}</StyledTableCell>
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          onClick={() => handleStatusButtonClick(row)}
                        >
                          Update
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={6}
                    count={filteredRows.length} // Use filteredRows for count
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}
