import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
// import 'react-toastify/dist/ReactToastify.css';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";


const useStyles = makeStyles()(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    },
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
}));

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = useSelector(state => state.users.user);

  return (
    <>
     <AppBar position="fixed" sx={{bgcolor: '#012952'}} >

       <Toolbar >
         <Grid container justifyContent="space-between" alignItems="center">
           <Grid item>
             <Typography variant="h6" >
               <Link to="/" className={classes.mainLink}>
                 Forum
               </Link>
             </Typography>
           </Grid>

           <Grid item>
             {user ? <UserMenu user={user}/> : <Anonymous/>}
           </Grid>
         </Grid>
       </Toolbar>
     </AppBar>
     <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;