import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: { text: '', id: '' },
    value: '',
  };

  componentDidMount() {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    if (localTodos) {
      this.setState({ todos: localTodos });
    }
  }
  componentDidUpdate(_, prevState) {
    const { todos, currentTodo } = this.state;
    const prevTodo = prevState.currentTodo;

    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    // if (prevTodo.currentTodo !== currentTodo) {
    //   // this.updateCurent();
    //   console.log('prevState');
    //   this.setState({
    //     currentTodo: { text: currentTodo.text },
    //   });
    // }
  }
  // updateCurent = () => {
  //   const { currentTodo } = this.state;

  //   this.setState({
  //     currentTodo: currentTodo,
  //   });
  // };
  handleSubmit = value => {
    console.log(value);
    const newTodo = { text: value, id: nanoid() };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleEdit = currentId => {
    this.setState({ isEditing: true });
    const cur = this.state.todos.find(({ id }) => id === currentId);
    console.log(cur);

    this.setState({
      currentTodo: cur,
    });
  };

  handleChangeState = e => {
    console.log(e);
    const { currentTodo } = this.state;
    console.log(currentTodo);

    this.setState(({ todos }) => {
      return {
        todos: todos.map(el => {
          if (el.id === currentTodo.id) {
            el.text = [currentTodo.text];
          }
        }),
      };
    });
  };
  handleCancel = () => {
    this.setState({ isEditing: false });
  };
  handleInputEditChange = event => {
    console.log(event.target.value);
    const changeText = event.target.value;

    this.setState(prevState => ({
      currentTodo: { id: prevState.currentTodo.id, text: changeText },
    }));
    console.log(this.state.currentTodo);
  };
  as = e => {
    console.log(e);

    const elId = this.state.currentTodo.id;
    const elText = e.text;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === elId) {
          todo.text = elText;
        }
        return todo;
      }),
    }));
    this.setState({ isEditing: false });
  };
  render() {
    const { todos, isEditing, currentTodo } = this.state;
    return (
      <>
        {!isEditing ? (
          <SearchForm onSubmit={this.handleSubmit} />
        ) : (
          <EditForm
            onCancel={this.handleCancel}
            currentTodo={currentTodo}
            onChange={this.handleInputEditChange}
            onUpdate={this.handleInputEditChange}
            as={this.as}
          />
        )}
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
