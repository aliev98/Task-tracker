// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import { useState, useEffect } from 'react'
import TaskAdder from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask]= useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

   const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    
    return data
  }

const addTask = async (task) => {

  const res = await fetch('http://localhost:5000/tasks', {
    method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() *
  // 10000) + 1

  // const id2 = (tasks.length) + 1; 
  // console.log(id2);

  //  const newTask = {id, ...task }
  //  setTasks([...tasks, newTask])
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

const ToggleReminder = async (id) => {
  
  const taskToggled = await fetchTask(id)
  const updTask = {...taskToggled, reminder: !taskToggled.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },

    body: JSON.stringify(updTask)
  })
  
  const data = await res.json()

   setTasks(
   tasks.map((task) => 
   task.id === id ? {...task, reminder: 
   data.reminder} : task
   )
   )
}

  return (
    <Router>
    <div className="container">
    <Header onAdd = {() => setShowAddTask(!showAddTask)} showText = {showAddTask}/>
    
  <Route path ='/' exact render={(props) => (
  <>
  {showAddTask && <TaskAdder onAdd = {addTask}/>}
  {  tasks.length > 0 ? 
     <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {ToggleReminder} />
     :'No tasks are found.'
  }
  </>
  )} />
  <Route path = '/about' component = {About}/>
  <Footer/>
  </div>
  </Router>
  );
}

export default App;