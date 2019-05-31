import React from 'react'
import { NavLink } from 'react-router-dom'

const isActive = ({ to }) => (_, { pathname }) => to.includes(pathname)

export default props =>
  <NavLink
    {...props}
    isActive={isActive(props)}
  />
