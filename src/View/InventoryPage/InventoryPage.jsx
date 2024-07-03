import React, {useEffect, useState} from 'react';
import {inventory} from "../../utils/Server.js";
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

function InventoryPage() {
    const [inventoryList, setInventoryList]= useState([]);
    const [selectedInventory, setSelectedInventory] = useState('');
    const [addInventory, setAddInventory] = useState({
        itemName:'',
        quantity:''
    })

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseUpdate = () => {
        setOpenUpdate(false)
        setSelectedInventory('')
    };

    const handleCloseAdd = () => {
        setOpenAdd(false)
        setAddInventory('')
    };

    useEffect(() => {
        fetchInventorys();
    }, []);

    function fetchInventorys(){
        axios.get(inventory)
            .then(response => setInventoryList(response.data))
            .catch((err) => {
                console.log(err.message);
            });
    }

    function handleDelete(id){
        axios.delete(`${inventory}/${id}`).then((response) => {
            if (response.status === 200) {
                fetchInventorys();
            }
        })
    }

    const handleUpdate = (e) =>{
        const {name, value} = e.target;
        setSelectedInventory((preData) => ({
            ...preData,
            [name]: value,
        }))
    }

    const handleAdd = (e) =>{
        const {name, value} = e.target;
        setAddInventory((preData) => ({
            ...preData,
            [name]: value,
        }))
    }

    function updateInventory() {
        axios.put(`${inventory}/${selectedInventory._id}`,selectedInventory).then((r) => {
            if (r.status === 200) {
                handleCloseUpdate()
                fetchInventorys();
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    function AddNewInventory() {
        axios.post(inventory,addInventory).then((r) => {
            if (r.status === 201) {
                handleCloseAdd()
                fetchInventorys();
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <Box sx={{marginY:2}}>
            <AddButton name="Inventory" handleOpenAdd={handleOpenAdd}/>
            <TableContainer component={Container} sx={{overflowX:{xs:'scroll', sm:'hidden'} }}>
                <Table  sx={{  padding:{xs:1, sm:3, md:5} }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"bold"}}>#id</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}}>Item Name</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}}>Quantity</TableCell>
                            <TableCell align="right" style={{fontWeight:"bold"}}>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventoryList?.map((data) => (
                            <TableRow
                                key={data._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {data._id}
                                </TableCell>
                                <TableCell align="center">{data.itemName}</TableCell>
                                <TableCell align="center">{data.quantity}</TableCell>
                                <TableCell align="right">
                                    <Stack direction='row' sx={{gap: {xs:1, sm:2, md:3}}} justifyContent='right'>
                                        <EditIcon onClick={()=>handleOpenUpdate(setSelectedInventory(data))}/>
                                        <DeleteIcon onClick={()=>handleDelete(data._id)}/>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*Model for update Inventory*/}
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
                        Inventory Update
                    </Typography>
                    <Stack gap={3} marginBottom={2}>
                        <TextField id="outlined-basic"
                                   label="Item Name"
                                   variant="outlined"
                                   defaultValue={selectedInventory.itemName}
                                   name="itemName"
                                   onChange={handleUpdate}
                        />
                        <TextField id="outlined-basic"
                                   label="Quantity"
                                   variant="outlined"
                                   defaultValue={selectedInventory.quantity}
                                   name="quantity"
                                   type="number"
                                   onChange={handleUpdate}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="right" gap={2}>
                        <Button variant="contained" onClick={updateInventory}>Update</Button>
                        <Button variant="contained" onClick={handleCloseUpdate}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
            {/* model for add inventory*/}
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
                        Add New Inventory
                    </Typography>
                    <Stack gap={3} marginBottom={2}>
                        <TextField id="outlined-basic"
                                   label="Item Name"
                                   variant="outlined"
                                   name="itemName"
                                   onChange={handleAdd}
                        />
                        <TextField id="outlined-basic"
                                   label="quantity"
                                   variant="outlined"
                                   name="quantity"
                                   type="number"
                                   onChange={handleAdd}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="right" gap={2}>
                        <Button variant="contained" onClick={AddNewInventory}>Add</Button>
                        <Button variant="contained" onClick={handleCloseAdd}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default InventoryPage;