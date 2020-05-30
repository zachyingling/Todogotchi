import React from 'react';

const NavBar = props => {
    return(
        <div>
        <AppBar position="static" {...props}>
            <Toolbar>
                <Typography variant="headline" color="#13F8E7" align="center">
                Todo-Gotchi
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;

// currently not using a NavBar