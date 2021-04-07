import React, { Component } from 'react';
import Container from '../components/Container';
import TodoList from '../components/TodoList';
import TodoEditor from '../components/ToDoEditor';
import Filter from '../components/TodoFilter';
import Stats from '../components/Stats';
import Modal from '../components/Modal';
import IconButton from '../components/IconButton';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import todosApi from '../services/todos-api';
import axios from 'axios';

const barStyles = {
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: 20,
};

class TodosView extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    // todosApi
    //   .fetchTodos()
    //   .then(todos => this.setState({ todos }))
    //   .catch(error => console.log(error));
    axios
      .get('http://localhost:3000/todos')
      .then(({ data }) => this.setState({ todos: data }))
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
  }

  addTodo = text => {
    const todoData = {
      text,
      completed: false,
    };

    axios.post('http://localhost:3000/todos', todoData).then(({ data }) => {
      this.setState(({ todos }) => ({ todos: [...todos, data] }));
    });
    this.toggleModal();
    // todosApi.addTodo(todoData).then(todo => {
    //   this.setState(({ todos }) => ({ todos: [...todos, todo] }));
    //   this.toggleModal();
    // });
  };

  deleteTodo = todoId => {
    axios.delete(`http://localhost:3000/todos/${todoId}`).then(() => {
      this.setState(({ todos }) => ({
        todos: todos.filter(({ id }) => id !== todoId),
      }));

      // todosApi.deleteTodo(todoId).then(() => {
      //   this.setState(({ todos }) => ({
      //     todos: todos.filter(({ id }) => id !== todoId),
      // }));
    });
  };

  toggleCompleted = todoId => {
    const todo = this.state.todos.find(({ id }) => id === todoId);
    const { completed } = todo;
    const update = { completed: !completed };

    axios
      .patch(`http://localhost:3000/todos/${todoId}`, update)
      .then(({ data }) => {
        this.setState(({ todos }) => ({
          todos: todos.map(todo => (todo.id === data.id ? data : todo)),
        }));
      });

    // todosApi.updateTodo(todoId, update).then(updatedTodo => {
    //   this.setState(({ todos }) => ({
    //     todos: todos.map(todo =>
    //       todo.id === updatedTodo.id ? updatedTodo : todo,
    //     ),
    //   }));
    // });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(({ text }) =>
      text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <div style={barStyles}>
          <Filter value={filter} onChange={this.changeFilter} />
          <Stats total={totalTodoCount} completed={completedTodoCount} />
          <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
            <AddIcon width="40" height="40" fill="#fff" />
          </IconButton>
        </div>

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default TodosView;
