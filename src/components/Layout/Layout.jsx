import React from 'react'
import style from '../Layout/Layout.module.css'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
  
  <Outlet/>

  </>
}
