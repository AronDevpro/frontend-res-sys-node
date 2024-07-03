import React from 'react';
import {Container} from "@mui/system";
import {Box, Button} from "@mui/material";

function AddButton({name, handleOpenAdd}) {
    return (
        <Box
            component={Container}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            marginY={2}
        >
            <Button variant="contained" onClick={handleOpenAdd}>Add {name}</Button>
        </Box>
    );
}

export default AddButton;