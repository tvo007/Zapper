import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';

const PopUpWrapper = props => {

const {openModal, handleCloseModal, dialogTitle, children, ...rest} = props

  return (
    <Dialog
      {...rest}
      open={openModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="lg"
    >
    <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
    <DialogContent>
        {children /**pass components here!! */}
    </DialogContent>
    </Dialog>
  );
};

PopUpWrapper.propTypes = {
    openModal: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    dialogTitle: PropTypes.string,
};

export default PopUpWrapper;
