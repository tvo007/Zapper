import React from 'react'
// import PropTypes from 'prop-types'
import {Grid} from '@material-ui/core'

const GridWrapper = ({children}) => {
    return (
        <Grid
        container
        spacing={4}
      >
          {children}
      </Grid>
    )
}

// GridWrapper.propTypes = {

// }

export default GridWrapper

