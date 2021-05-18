import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();
  const {open, setOpen, message} = props;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Box>{message}</Box>
    </Backdrop>
  );
}
