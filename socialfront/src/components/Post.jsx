import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap'
import {icons} from '../services/IconImages'
export default function Post({post}) {
const [liked, setLiked]=useState(false)

const likeHandler = () =>{
    setLiked(isLiked=>!isLiked)
}

  return (
    <Container fluid>
      <Card className="post theme-transition">
      <Row>
        <Col xs={3}>
          <div className='post__profile-photo-container'>
          <img src={post.mood} className='post__profile-photo'/>
          </div></Col>
    
    <Col>
    <Card.Header className='post__header'>
      
      {post.name}
      
      </Card.Header>
    <Card.Body className='post__body'>
    
      <Card.Text >
      {post.message}
      {}
      </Card.Text>
    </Card.Body>
    </Col>
    <Card.Footer className="d-flex justify-content-between align-items-center post__footer">
      {post.date}
      <div className='d-flex align-items-center'>
        {liked?1:0}
      <Button className='bg-transparent border-0' onClick={likeHandler}>{liked?'🧡':'🤍'}</Button>
      </div>
    </Card.Footer>
    
  </Row>
  </Card>
  </Container>
  )
}
