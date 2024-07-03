import {useEffect, useState} from "react";
import {restaurant} from "../../utils/Server.js";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
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
import AddButton from "../../Component/AddButton.jsx";
import axios from "axios";

function RestaurantPage() {
    const [restaurantList, setRestaurantList]= useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [addRestaurant, setAddRestaurant] = useState({
        name:'',
        address:'',
        phoneNumber:''
    })

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseUpdate = () => {
        setOpenUpdate(false)
        setSelectedRestaurant('')
    };

    const handleCloseAdd = () => {
        setOpenAdd(false)
        setAddRestaurant('')
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    function fetchRestaurants(){
        axios.get(restaurant)
            .then(response => setRestaurantList(response.data))
            .catch((err) => {
                console.log(err.message);
            });
    }

    function handleDelete(id){
        axios.delete(`${restaurant}/${id}`).then((response) => {
            if (response.status === 200) {
                fetchRestaurants();
            }
        })
    }

    const handleUpdate = (e) =>{
        const {name, value} = e.target;
        setSelectedRestaurant((preData) => ({
            ...preData,
            [name]: value,
        }))
    }

    const handleAdd = (e) =>{
        const {name, value} = e.target;
        setAddRestaurant((preData) => ({
            ...preData,
            [name]: value,
        }))
    }

    function updateRestaurant() {
        axios.put(`${restaurant}/${selectedRestaurant._id}`, selectedRestaurant).then((r) => {
            if (r.status === 200) {
                handleCloseUpdate()
                fetchRestaurants();
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    function AddNewRestaurant() {
        axios.post(restaurant, addRestaurant).then((r) => {
            if (r.status === 201) {
                handleCloseAdd()
                fetchRestaurants();
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    return (
        <Box sx={{marginY:2}}>
            <AddButton name="Restaurant" handleOpenAdd={handleOpenAdd}/>
            <TableContainer component={Container} sx={{overflowX:{xs:'scroll', sm:'hidden'} }}>
                <Table  sx={{  padding:{xs:1, sm:3, md:5} }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"bold", width:20}}>#id</TableCell>
                            <TableCell align="left" style={{fontWeight:"bold"}}>Name</TableCell>
                            <TableCell align="left" style={{fontWeight:"bold"}}>Address</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}}>Phone Number</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantList?.map((data) => (
                            <TableRow
                                key={data._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {data._id}
                                </TableCell>
                                <TableCell align="left">{data.name}</TableCell>
                                <TableCell align="left">{data.address}</TableCell>
                                <TableCell align="center">{data.phoneNumber}</TableCell>
                                <TableCell align="right">
                                    <Stack direction='row' sx={{gap: {xs:1, sm:2, md:3}}} justifyContent='right'>
                                        <EditIcon onClick={()=>handleOpenUpdate(setSelectedRestaurant(data))}/>
                                        <DeleteIcon onClick={()=>handleDelete(data._id)}/>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*model for update*/}
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
                        Restaurant Update
                    </Typography>
                    <Stack gap={3} marginBottom={2}>
                        <TextField id="outlined-basic"
                                   label="Name"
                                   variant="outlined"
                                   defaultValue={selectedRestaurant.name}
                                   name="name"
                                   onChange={handleUpdate}
                        />
                        <TextField id="outlined-basic"
                                   label="Address"
                                   variant="outlined"
                                   defaultValue={selectedRestaurant.address}
                                   name="address"
                                   onChange={handleUpdate}
                        />
                        <TextField id="outlined-basic"
                                   label="Phone Number"
                                   variant="outlined"
                                   defaultValue={selectedRestaurant.phoneNumber}
                                   name="phoneNumber"
                                   onChange={handleUpdate}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="right" gap={2}>
                        <Button variant="contained" onClick={updateRestaurant}>Update</Button>
                        <Button variant="contained" onClick={handleCloseUpdate}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
            {/* model for add*/}
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
                        Add New Restaurant
                    </Typography>
                    <Stack gap={3} marginBottom={2}>
                        <TextField id="outlined-basic"
                                   label="Name"
                                   variant="outlined"
                                   name="name"
                                   onChange={handleAdd}
                        />
                        <TextField id="outlined-basic"
                                   label="Address"
                                   variant="outlined"
                                   name="address"
                                   onChange={handleAdd}
                        />
                        <TextField id="outlined-basic"
                                   label="Phone Number"
                                   variant="outlined"
                                   name="phoneNumber"
                                   onChange={handleAdd}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="right" gap={2}>
                        <Button variant="contained" onClick={AddNewRestaurant}>Add</Button>
                        <Button variant="contained" onClick={handleCloseAdd}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default RestaurantPage;