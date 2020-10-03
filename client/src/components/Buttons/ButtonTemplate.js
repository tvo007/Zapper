import React from 'react'
import PropTypes from 'prop-types'
import {
    Button
  } from '@material-ui/core';

const ButtonTemplate = (props) => {

    const {onClick, text, type} = props;

    return (
        <Button color="primary" variant="contained" type={type} onClick={onClick}>
            {text}
        </Button>
    )
}

ButtonTemplate.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    
}

export default ButtonTemplate

