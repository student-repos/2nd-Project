/**
 * src/comp/Container.jsx
 */


// import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'


export const Container = () => {

  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}