import React,{useState, useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import PostForm from './PostForm';

import { SocialContext } from '../App';

export default function Feed() {
  const [filterType, setFilterType]=useState('')
  const socialContext = useContext(SocialContext)
  return (
    <div className='feed'>
      <div className='tabs'>
        <div className='tabs__content'>
      <Tabs
      defaultActiveKey="profile"
      className=" mb-3"
      >
      <Tab eventKey="filter" title="Filter">
        <div className='filter d-flex'>
      <Form onSubmit={e=>socialContext.blogFilter(e, filterType)} className='d-flex w-100'>
          <Form.Select className='w-100' onChange={e=>setFilterType(e.target.value)}>
            <option>Sort By</option>
            <option value='date-newest'>Newest</option>
            <option value='date-oldest'>Oldest</option>
          </Form.Select>
        <Button type='submit'>Filter</Button>
      </Form>
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
