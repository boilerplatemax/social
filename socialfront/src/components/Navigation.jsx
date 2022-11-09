import React, { useContext, useEffect, useState } from 'react';
import { SocialContext } from '../App';
import { CloseButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Offcanvas from 'react-bootstrap/Offcanvas';

import {Link} from 'react-router-dom'

export default function Navigation({userName}) {
    const socialContext = useContext(SocialContext)
    const expand='false';
    const [expanded, setExpanded]=useState(false)
    const signOutHandlerMobile=()=>{
      socialContext.signOutHandler()
      setExpanded(false)
    }
    const themeVarient = socialContext.theme
    const offCanvasStyle=themeVarient==='light'?
    {
      backgroundColor:'whiteSmoke',
      color:'rgb(69, 69, 102)'
    }
    :
    {
      backgroundColor:'rgb(69, 69, 102)',
      color:'whiteSmoke'
    }
    const linkStyle=themeVarient==='light'?
    {
      fill:'whiteSmoke',
      color:'rgb(69, 69, 102)'
    }
    :
    {
      fill:'rgb(69, 69, 102)',
      color:'whiteSmoke'
    }
    
  return (
<div className='navigation theme-transition'>
        <Navbar key={expand} variant={socialContext.theme} expand={expand} expanded={expanded}>
          <Container>
          <Link to={userName?'/home':null} style={{textDecoration:'none'}}><Navbar.Brand>Tweeter</Navbar.Brand></Link>

            {
            userName&&
            <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            className='nav__hamburger-menu'
            onClick={()=>setExpanded(e=>!e)}
            />
            }

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              style={offCanvasStyle}
            >
              <Offcanvas.Header>
              
     
            {userName&&<Navbar.Text className="justify-content-end flex-grow-1 pe-3">
              Signed in as: <a href="#login">{userName}</a>
            </Navbar.Text>}
            <CloseButton onClick={()=>setExpanded(false)} className='float-end' style={linkStyle}/>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">
                  <Form onChange={socialContext.toggleTheme}>
                    <Form.Check 
                    className='nav__theme-toggle'
                        type="switch"
                        id="custom-switch"
                        label={`${socialContext.theme} View`}
                    />
                    </Form>
                  </Nav.Link>
                  <Link to={'/login'} className='link' onClick={signOutHandlerMobile}  style={linkStyle}>Sign out</Link>
                </Nav>

              </Offcanvas.Body>

            </Navbar.Offcanvas>
            {userName&&<Navbar.Text className='hide-mobile'>
              Signed in as: <a href="#login">{userName}</a>
            </Navbar.Text>}
          </Container>
        </Navbar>

    </div>
  )
}
