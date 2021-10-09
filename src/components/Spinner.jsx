import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';
import PropTypes from 'prop-types';

Spinner.propTypes = {
   open: PropTypes.bool.isRequired,
};

export default function Spinner(props) {
    console.log('open', props.open);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    //   onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
