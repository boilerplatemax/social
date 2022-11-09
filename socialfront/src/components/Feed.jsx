import React,{useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import PostForm from './PostForm';

import { SocialContext } from '../App';

export default function Feed() {
  const socialContext = useContext(SocialContext)
  return (
    <div className='feed'>
      <div className='tabs'>
        <div className='tabs__content'>
      <Tabs
      defaultActiveKey="profile"
      
      className=" mb-3"
    >
      <Tab eventKey="home" title="Home">
        <div className='filter d-flex'>
      <Form.Select>
        <option>Sort By</option>
        <option>Most Liked</option>
        <option>Newest</option>
        <option>Oldest</option>
      </Form.Select>
      <Button>Filter</Button>
      </div>
      </Tab>

      <Tab eventKey="create" title="Create Post">
        <PostForm/>
      </Tab>

    </Tabs>
    </div>
    </div>


        <div className='posts'>
        {socialContext.blogsToShow.map(post=>{
          return(
              <Post key={post.id} post={post}/>
          )
        })}
        </div>
    </div>
  )
}
