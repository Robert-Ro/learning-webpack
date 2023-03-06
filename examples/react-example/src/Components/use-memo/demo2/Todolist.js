import React, { useLayoutEffect } from 'react'
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = filterTodos(todos, tab) // NOTE no useMemo

  useLayoutEffect(() => {
    console.log('TodoList before paint')
  }, [])

  return (
    <div className={theme}>
      <ul>
        <p>
          <b>
            Note: <code>filterTodos</code> is artificially slowed down!
          </b>
        </p>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
