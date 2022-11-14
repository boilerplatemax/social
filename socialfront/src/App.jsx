import { useState,createContext, useRef, useEffect} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Navigation from './components/Navigation'
import LoginPage from './pages/LoginPage';
import Content from './components/Content';

import blogService from './services/BlogService'
import {icons} from './services/IconImages'
import { sanitizeFilter, set } from 'mongoose';

export const SocialContext = createContext(null)

function App() {
  const [theme,setTheme]=useState("light")
  const [blogs, setBlogs] = useState([])
  const [filterType, setFilterType]=useState([])
  const [userName, setUserName]=useState('')
    
  const storedThemeVariant = localStorage.getItem('SOCIAL_THEME')
  const storedUserName=localStorage.getItem('SOCIAL_USERNAME')

  useEffect(()=>{
    if(storedThemeVariant)setTheme(storedThemeVariant)

    if(storedUserName)setUserName(localStorage.getItem('SOCIAL_USERNAME'))
    refreshBlogs()
  },[])
  useEffect(()=>{
    localStorage.setItem('SOCIAL_THEME', theme)
  },[theme])
  const sendMessage=(displayMessage, delay=100000)=>{
    setMessage(displayMessage)
    setTimeout(() => {
      setMessage(null)
    }, delay)
  }
  const refreshBlogs=()=>{
    blogService.getAll()
    .then(response=>{
      setBlogs(response.reverse())
    })
  }
  const signOutHandler=()=>{
    localStorage.removeItem("SOCIAL_USERNAME")
    setUserName(null)
  }

  const submitHandler=(e,postMessage,mood)=>{
    let imgNum=1
    console.log(mood)
    switch(mood){
      case "Joyful":imgNum=Math.floor(Math.random() * 4) + 0
      break;
      case"Upset":imgNum=Math.floor(Math.random() * 4) + 4
      break;
      case "Shocked":imgNum=Math.floor(Math.random() * 2) + 8
      break;
      case"Secretive":imgNum=Math.floor(Math.random() * 3) + 10
      break;
      case "Fabulous":imgNum=Math.floor(Math.random() * 2) + 13
      break;
      case"Evil":imgNum=Math.floor(Math.random() * 4) + 15
      break;
      case "Flex":imgNum=Math.floor(Math.random() * 2) + 19
      break;
      case"Stupid":imgNum=Math.floor(Math.random() * 2) + 21
      break;
      default:imgNum=23
      break;
    }

    const newPost = {
      name:userName,
      message:postMessage,
      mood:icons[imgNum],
      date:new Date().toLocaleDateString()  
    }
    {console.log(newPost.mood)}
      blogService.create(newPost)
      .then(response=> {
        setBlogs(blogs.concat(newPost))
        sendMessage(`New contact: ${response.name} was added successfully`)
      })
      .catch(error => {
        sendMessage(`[ERROR] ${error.response.data.error}`)
        // console.log(error.response.data)
      })

    document.getElementById('postForm').reset()
    refreshBlogs()
  }

  const blogsToShow = filterType!='date-oldest'?blogs:[...blogs].reverse();

  const toggleTheme = ()=>{
    setTheme(cur=>cur==="light"?"dark":"light")
  }

  const blogFilter = (e, filter) =>{
    e.preventDefault()
    console.log(filter)
    if(filter==='date-oldest'||filter==='date-newest')setFilterType(filter)
    
    
  }
  return (
    
    <SocialContext.Provider value={{
      toggleTheme,
      theme,
      blogsToShow,
      setUserName,
      submitHandler,
      blogFilter,
      signOutHandler
      }}>
      <BrowserRouter>
    <div className="App theme-transition" id={theme}>
      <Navigation userName={userName}/>
      <Routes>
        <Route path="/home" element={<Content userName={userName}/>} />
        <Route path="/login" element={<LoginPage setUserName={setUserName}/>} />

        <Route path="/" element={<Content userName={userName}/>} />
      </Routes>
    </div>
    </BrowserRouter>
    </SocialContext.Provider>
  )
}

export default App
