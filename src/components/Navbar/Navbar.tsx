import { Box, Typography, AppBar, Toolbar } from "@mui/material";

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary" sx={{ padding: '0.7rem 0' }}>
                <Toolbar>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        CryptoConvert
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;