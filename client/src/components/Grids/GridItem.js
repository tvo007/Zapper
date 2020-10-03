import React from 'react'
import {Grid} from '@material-ui/core'

const GridItem = ({children}) => {
    return (
        <Grid
          item
        >
            {children}
        </Grid>
    )
}

export default GridItem

