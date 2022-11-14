import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';





export default function LoginPage({setUserName}) {
    const [submitted,setSubmitted]=useState(false)
    const navigate = useNavigate();
    const [name,setName]=useState('')

    const submitHandler=(e)=>{
        e.preventDefault()
        const newName=(e.target.username.value)
        if(name.length<2)return
        localStorage.setItem("SOCIAL_USERNAME", newName)
        setUserName(newName)
        navigate('/home', {replace: true});

    }
  return (

    <div className={`loginpage ${submitted&&'loginpage-animated'}`}>
        <Container>
            <Row>
                <Col md={12} xl={{span:6}}>
                <div className= 'mt-5'>
                    <h1 className='loginpage__title'>Welcome Human!</h1>
                    <p>Social media clone by Max Shapovalov</p>
                </div>
                
                </Col>
                <Col md={12} xl={{span:4, offset:-2}}>
                <Card className="mt-5">
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    {/* <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text> */}
                    <Form onSubmit={e=>submitHandler(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" name="username" onChange={e=>setName(e.target.value)}/>
                        <p>
                        This is the name others will see you as.
                        </p>
                    </Form.Group>


                    {name.length<2?
                    <Button variant="primary" type="submit" disabled>
                        Enter
                    </Button>:
                    <Button variant="primary" type="submit">
                        Enter
                    </Button>
                    }
                    </Form>
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>

    </div>
  )
}
