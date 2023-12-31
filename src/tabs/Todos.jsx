import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Todo } from 'components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: { text: '', id: '' },
  };

  componentDidMount() {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    if (localTodos) {
      this.setState({ todos: localTodos });
    }
  }
  componentDidUpdate(_, prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
  handleSubmit = value => {
    console.log(value);
    const newTodo = { text: value, id: nanoid() };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
    toast.success('Create successfully');
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
    toast.error('Delete successfully');
  };
  handleEdit = currentId => {
    this.setState({ isEditing: true });
    const cur = this.state.todos.find(({ id }) => id === currentId);

    this.setState({
      currentTodo: cur,
    });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  handleInputEditChange = event => {
    const changeText = event.target.value;

    this.setState(prevState => ({
      currentTodo: { id: prevState.currentTodo.id, text: changeText },
    }));
  };
  onUpdate = event => {
    const currentId = this.state.currentTodo.id;
    const currentText = event.text;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === currentId) {
          todo.text = currentText;
        }
        return todo;
      }),
    }));
    toast.success('Update successfully');

    this.setState({ isEditing: false });
  };
  render() {
    const { todos, isEditing, currentTodo } = this.state;
    return (
      <>
        {!isEditing ? (
          <SearchForm onSubmit={this.handleSubmit} />
        ) : (
          <>
            <EditForm
              onCancel={this.handleCancel}
              currentTodo={currentTodo}
              onChange={this.handleInputEditChange}
              onUpdate={this.onUpdate}
            />
          </>
        )}
        <ToastContainer autoClose={2000} />
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo
                onDelete={this.deleteTodo}
                onEdit={this.handleEdit}
                todo={todo}
                index={index + 1}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
