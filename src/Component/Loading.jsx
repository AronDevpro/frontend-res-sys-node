import {CircularProgress} from "@mui/material";
import {Container} from "@mui/system";

function Loading() {
    return (
        <Container sx={{width: "90vh",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center" }}>
            <CircularProgress/>
        </Container>
    );
}

export default Loading;