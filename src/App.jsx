import { useState,useRef, useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, Setshowfinished] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring)
    {
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLs=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleChange=()=>{
    Setshowfinished(!showfinished)
  }

  const handleEdit = (id) => {
      inputRef.current.focus()
      setTodos(todos.filter(i=>i.id!=id))
      let t=todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      saveToLs();
  }
  const handleDelete = (id) => {
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos=todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newTodos)
    saveToLs();
  }
  const handleAdd = () => {
    setTodos([...todos, { todo,id:uuidv4(), isCompleted: false }])
    setTodo("")
    saveToLs();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox =(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos=[...todos]
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs();
  }
  return (
    <>
      <Navbar />
      <div className="container rounded-xl bg-slate-400 m-12 min-h-[70vh] w-[90vw] xl-w-120vw ">
        <div className='w-full text-center text-2xl font-bold'>する-Manage Todos all at one place</div>
        <div className="addTodo m-3">
          <h2 className='text-lg font-bold mx-3'>Add a Todo</h2>
          <input ref={inputRef} onChange={handleChange} value={todo} className='rounded-lg h-8 w-[50vw] mx-3 my-2' type="text" />
          <button disabled={todo.length<3} onClick={handleAdd} className='max-sm:text-xs  border-solid border-2 border-zinc-500 rounded-xl p-1 bg-green-400 disabled:hidden hover:bg-green-500 m-[4px] px-3'>Add</button>
        </div>
        
        <h2 className='text-lg font-bold mx-6'>Your Todos</h2>
        <div className="todos m-2 overflow-auto h-1/2">
        <input onChange={toggleChange} className='m-2' type="checkbox" checked={showfinished} />Show Finished
          {todos.length===0 && <div>No Todos To Display</div>}
          {todos.map(item => {
            return( (showfinished || !item.isCompleted) &&
            <div key={item.id} className="todo flex gap-2 items-center justify-between
            ">
              <div className='flex gap-2 overflow-hidden'>
              <input name={item.id} type="checkbox" onChange={handleCheckbox} checked={item.isCompleted}/>
              <div className={`${item.isCompleted?"line-through":""} overflow-hidden max-md:w-28 w-60 max-sm:text-xs `}>{item.todo}</div>
              </div>
              <div className="button">
                <button onClick={()=>handleEdit(item.id)} className="max-sm:text-xs border-solid border-2 border-zinc-500 rounded-xl p-1 px-3 bg-green-400 hover:bg-green-500 m-[3px]">Edit</button>
                <button onClick={()=>handleDelete(item.id)} className='max-sm:text-xs  border-solid border-2 border-zinc-500 rounded-xl p-1 px-3 bg-green-400 hover:bg-green-500 m-[3px]'>Delete</button>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
