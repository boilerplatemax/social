import React, { useContext } from 'react';
import { SocialContext } from '../App';
import { Link } from 'react-router-dom'


import Form from 'react-bootstrap/Form';

export default function Sidebar() {
  const socialContext = useContext(SocialContext)
  
  return (
    <div className='sidebar hide-mobile' variant='light'>
      <div className='sidebar__content'>
      <div className='link-container'><Link to={'/'} className='link'>Home</Link></div>
      <div className='link-container'>
      <Form onChange={socialContext.toggleTheme}>
        <Form.Label className='nav__theme-toggle '>{`${socialContext.theme} View`}</Form.Label>
        <Form.Check 
          className='nav__theme-toggle'
          type="switch"
          id="custom-switch"

          // label={`${socialContext.theme} View`}
        />
      </Form>{}
      </div>
      <div className='link-container' onClick={socialContext.signOutHandler}><Link to={'/login'} className='link'>Sign out</Link></div>
      </div>
    </div>
    
  )
}
