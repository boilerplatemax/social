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

export const SocialContext = createContext(null)

function App() {
  const [theme,setTheme]=useState("light")
  const [blogs, setBlogs] = useState([])
  const [searchFilters, setSearchFilters] = useState('')
  const [message, setMessage] = useState(null)
  const blogInfo = useRef({name:'',message:''})
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
  const getNameFromId=(id)=>{
    const filteredBlog = blogs.filter(blog => blog.id === id)
    return filteredBlog[0].name
  }
  // const removeHandler=id=>{
  //   const blogName = getNameFromId(id)
  //   blogService.remove(id)
  //   .then(response=>{
  //     sendMessage(`${blogName} was removed from contacts`)
  //     const filteredBlogs=blogs.filter(blog=>blog.id!==id)
  //     setBlogs(filteredBlogs)
  //   })
  //   .catch(error=>{
  //     sendMessage(`[ERROR] User not found`)
  //   })
  // }
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
  const filterHandler = e =>{
    const filter = e.target.value
    setSearchFilters(filter)
  }
  const updateHandler = (id,newInfo) =>{
    const blogName=getNameFromId(id)
    blogService.update(id,newInfo)
    .then(response=>{
      sendMessage(`${blogName} was successfully updated`)
      setBlogs(response)
    })
    .catch(error=>{
      console.log(error)
      const blogName=getNameFromId(id)

      sendMessage(`[ERROR] ${error.response.data.error}`)
    })
    
  }
  const blogsToShow = searchFilters===''?blogs:blogs.filter(blog=>(blog.name.toLowerCase()).includes(searchFilters.toLowerCase()))

  const toggleTheme = ()=>{
    setTheme(cur=>cur==="light"?"dark":"light")
  }
  return (
    
    <SocialContext.Provider value={{
      toggleTheme,
      theme,
      blogsToShow,
      setUserName,
      submitHandler,
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
