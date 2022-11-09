import React,{useContext, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { SocialContext } from '../App'

export default function PostForm() {
    const socialContext = useContext(SocialContext)
    const [message, setMessage]=useState('')
    const [mood, setMood]=useState('')
  return (
    <Form className="mb-3 postform theme-transition-shadows" id="postForm" onSubmit={e=>socialContext.submitHandler(e,message, mood)}>
    <Form.Group className="mb-3 postform__form" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Create Post</Form.Label>
      <Form.Control as="textarea" rows={3} style={{resize:"none"}} className="postform__form-text-area mb-3" onChange={(e)=>setMessage(e.target.value)} placeholder='Share your thoughts...'/>
      <div className='d-flex justify-content-between '>
    <Form.Select className='w-75' onChange={e=>setMood(e.target.value)}>
        <option>Select Mood</option>
        <option value='Joyful'>Joyful</option>
        <option value='Upset'>Upset</option>
        <option value='Shocked'>Shocked</option>
        <option value='Secretive'>Secretive</option>
        <option value='Fabulous'>Fabulous</option>
        <option value='Evil'>Evil</option>
        <option value='Flex'>Flex</option>
        <option value='Stupid'>Stupid</option>
        <option value='Smart'>Smart</option>
      </Form.Select>
    
    {message.length<=0||message.length>256||mood===''?
    <Button disabled>Post</Button>:
    <Button type="submit" className='float-end'>Post</Button>
    }
    </div>
    </Form.Group>

  </Form>
  )
}
