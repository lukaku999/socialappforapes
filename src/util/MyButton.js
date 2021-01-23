import React from 'react'

import Tooltip from "@material-ui/core/Tooltip"
import IconButton from '@material-ui/core/IconButton'

//if it doesnt have a specific parameter its okay
export default ({children, onClick, tip, btnClassName, tipClassName}) => (
    <Tooltip title={tip} className={tipClassName} placement = "top">

        <IconButton onClick = {onClick} className = {btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
    
)


