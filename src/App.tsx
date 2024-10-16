import { useState } from 'react'
import './App.css'

type Todo = {
  id: number
  name: string
  completed: boolean
}

export function App() {

  const [todoList, setTodoList] = useState<Todo[]>([])

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      todo: { value: string }
    }
    const name = target.todo.value
    setTodoList([...todoList, { id: todoList.length + 1, name, completed: false }])
    target.todo.value = ''
  }

  const toggleCompleted = (id: number) => {
    setTodoList(todoList.map((todo) => todo.id === id ? {...todo, completed: !todo.completed } : todo))
  }

  const deleteItem = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <div className='App'>
        <h1>To do list</h1>
        <div>
          <form onSubmit={addTodo}>
            <input type="text" name='todo' />
            <button>Add</button>
          </form>
        </div>
      </div>
      {todoList.map((todo) => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => { toggleCompleted(todo.id) }} />
          {todo.name}
          <button onClick={() => { deleteItem(todo.id) }}>Delete</button>
        </div>
      ))}
    </>
  )
}


