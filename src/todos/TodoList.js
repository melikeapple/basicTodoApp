import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NewTodoForm from './NewTodoForm'
import {
  getTodosLoading,
  getInCompletedTodos,
  getCompletedTodos,
} from './selectors'
import TodoListItem from './TodoListItem'
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from './thunks'

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`
const TodoList = ({
  inCompleteTodos,
  completedTodos,
  onRemovePressed,
  onCompletedPressed,
  startLoadingTodos,
  isLoading,
}) => {
  useEffect(() => {
    startLoadingTodos()
  }, [])

  const loadingMessage = <div>Loading todos...</div>
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>InComplete:</h3>
      {inCompleteTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h3>Completed Todos:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </ListWrapper>
  )
  return isLoading ? loadingMessage : content
}

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  inCompleteTodos: getInCompletedTodos(state),
})

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
