import React from 'react'
import Feed from './Feed'
import Sidebar from './Sidebar'
import {Container, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Content({userName}) {
  const storedUserName=localStorage.getItem('SOCIAL_USERNAME')

  const navigate= useNavigate()
  
  useEffect(()=>{
    if(!storedUserName){navigate('/login')}

  },[])
  return (
    <Container style={{height:'100%'}}>
      <Row>
        <Col lg={{span:3}}><Sidebar/></Col>
        <Col lg={{span:6}}><Feed/></Col>
        <Col lg={{span:3}}></Col>
      </Row>
    </Container>
  )
}
