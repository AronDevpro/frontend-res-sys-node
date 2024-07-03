import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {Container} from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import Modal from "@mui/material/Modal";
import {customer, reservation} from "../../utils/Server.js";
import AddButton from "../../Component/AddButton.jsx";
import axios from "axios";

function ReservationPage() {
    const [reservationList, setReservationList] = useState([]);
    const [customerList, setCustomerList]= useState([]);

    const [selectedReservation, setSelectedReservation] = useState('');
    const [addReservation, setAddReservation] = useState({
        customerId: '',
        date: '',
        time: '',
        noOfPeople: ''
    })

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseUpdate = () => {
        setOpenUpdate(false)
        setSelectedReservation('')
    };

    const handleCloseAdd = () => {
        setOpenAdd(false)
        setAddReservation('')
    };

    useEffect(() => {
        fetchReservations();
        fetchCustomers();
    }, []);

    function fetchCustomers(){
        axios.get(customer)
            .then(response => setCustomerList(response.data))
            .catch((err) => {
                console.log(err.message);
            });
    }

    function fetchReservations() {
        axios.get(reservation)
            .then(response => setReservationList(response.data))
            .catch((err) => {
                console.log(err.message);
            });
    }

    function handleDelete(id) {
        axios.delete(`${reservation}/${id}`).then((response) => {
            if (response.status === 200) {
                fetchReservations();
            }
        })
    }

    const handleUpdate = (e) => {
        const {name, value} = e.target;
        setSelectedReservation((preData) => ({
            ...preData,
            [name]: value,
        }))
    }

    const handleAdd = (e) => {
        const {name, value} = e.target;
        setAddReservation((preData) => ({
            ...preData,
            [name]: value,
        }))
    }

    function updateReservation() {
        axios.put(`${reservation}/${selectedReservation._id}`, selectedReservation).then((r) => {
            if (r.status === 200) {
                handleCloseUpdate()
                fetchReservations();
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    function AddNewReservation() {
        axios.post(reservation, addReservation).then((r) => {
            if (r.status === 201) {
                handleCloseAdd()
                fetchReservations();
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }


    return (
        <Box>
            <AddButton name="Reservation" handleOpenAdd={handleOpenAdd}/>
            <TableContainer component={Container} sx={{overflowX: {xs: 'scroll', sm: 'hidden'}}}>
                <Table sx={{padding: {xs: 1, sm: 3, md: 5}}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: "bold", width: 20}}>#id</TableCell>
                            <TableCell align="left" style={{fontWeight: "bold"}}>CustomerId</TableCell>
                            <TableCell align="left" style={{fontWeight: "bold"}}>Date</TableCell>
                            <TableCell align="center" style={{fontWeight: "bold"}}>Time</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>No of People</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservationList?.map((data) => (
                            <TableRow
                                key={data._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {data._id}
                                </TableCell>
                                <TableCell align="left">{data.customerId}</TableCell>
                                <TableCell align="left">{data.date}</TableCell>
                                <TableCell align="center">{data.time}</TableCell>
                                <TableCell align="center">{data.noOfPeople}</TableCell>
                                <TableCell align="right">
                                    <Stack direction='row' sx={{gap: {xs: 1, sm: 2, md: 3}}} justifyContent='right'>
                                        <EditIcon onClick={() => handleOpenUpdate(setSelectedReservation(data))}/>
                                        <DeleteIcon onClick={() => handleDelete(data._id)}/>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*model for update reservation*/}
            <Modal
                open={openUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" align="center" marginY={2}>
                        Reservation Update
                    </Typography>
                    <Stack gap={3} marginBottom={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Customer Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Customer Id"
                                value={selectedReservation._id || ''}
                                onChange={handleUpdate}
                                name="customerId"
                            >
                                {customerList.map((data)=>(
                                <MenuItem  value={data._id} key={data._id}>{data._id} - {data.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic"
                                   label="Date"
                                   variant="outlined"
                                   defaultValue={selectedReservation.date}
                                   name="date"
                                   onChange={handleUpdate}
                                   type="date"
                        />
                        <TextField id="outlined-basic"
                                   label="Time"
                                   variant="outlined"
                                   defaultValue={selectedReservation.time}
                                   name="time"
                                   onChange={handleUpdate}
                                   type="time"
                        />
                        <TextField id="outlined-basic"
                                   label="No of People"
                                   variant="outlined"
                                   defaultValue={selectedReservation.noOfPeople}
                                   name="noOfPeople"
                                   onChange={handleUpdate}
                                   type="number"
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="right" gap={2}>
                        <Button variant="contained" onClick={updateReservation}>Update</Button>
                        <Button variant="contained" onClick={handleCloseUpdate}>Close</Button>
                    </Stack>
                </Box>
            </Modal>

            {/* model for add reservation*/}
            <Modal
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" align="center" marginY={2}>
                        Add New Reservation
                    </Typography>
                    <Stack gap={3} marginBottom={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Customer Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Customer Id"
                                onChange={handleAdd}
                                name="customerId"
                            >
                                {customerList.map((data)=>(
                                    <MenuItem value={data._id} key={data._id}>{data._id} - {data.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic"
                                   label="Date"
                                   variant="outlined"
                                   name="date"
                                   onChange={handleAdd}
                                   type="date"
                        />
                        <TextField id="outlined-basic"
                                   label="Time"
                                   variant="outlined"
                                   name="time"
                                   onChange={handleAdd}
                                   type="time"
                        />
                        <TextField id="outlined-basic"
                                   label="No of People"
                                   variant="outlined"
                                   name="noOfPeople"
                                   onChange={handleAdd}
                                   type="number"
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="right" gap={2}>
                        <Button variant="contained" onClick={AddNewReservation}>Add</Button>
                        <Button variant="contained" onClick={handleCloseAdd}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default ReservationPage;