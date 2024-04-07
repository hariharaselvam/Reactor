import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import { Typography } from '@mui/material'
import classes from '*.module.css'


function Navigate () {
  return (
    <Typography className={classes.root}>
      <Link to="/">
        Home
      </Link>
      <Link to="/about">About-Us</Link>
      <Link to="/contact">Contact-Us</Link>
    </Typography>
  )
}

export default Navigate
