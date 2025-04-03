import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

export const Layout = ({children}) => {
  return (
    <>
    <Navbar expand="lg" className="bg-primary" variant='dark'>
        <Navbar.Brand href="#home">Toy Store</Navbar.Brand>
    </Navbar>
    <Container>{children}</Container>
    </>
  )
}
