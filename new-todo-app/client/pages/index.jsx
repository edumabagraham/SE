import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast, ToastContainer } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

import TodoComponent from '../components/Todo';
import api from '../network/api';

import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);
  const [todoInput, setTodoInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setFetching(true);
      const response = await api.get('/api/todos');
      setTodos(response.data.data);
      setFetching(false);
    };
    fetchTodos();
  }, [reloadCount]);

  const addTodo = async () => {
    if (!todoInput) {
      toast.error('Please enter a title!');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/api/todos', {
        title: todoInput,
      });
      setTodos([...todos, response.data.data]);
      setTodoInput('');
      toast.success('Todo added successfully');
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  const reload = () => setReloadCount(reloadCount + 1);

  return (
    <>
      <Head>
        <title>Home | Todo App</title>
      </Head>
      <div className="root">
        <header>
          <h1>Todo App</h1>

          <div>
            <input
              type="text"
              placeholder="What to do?"
              className="todo-input"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <button className="todo-btn" onClick={addTodo}>
              {loading ? <BeatLoader color="#000" /> : <span>Add Todo &rarr;</span>}
            </button>
          </div>
        </header>
        <main>
          {fetching ? (
            <div className="loading">
              <BeatLoader color="#000" />
            </div>
          ) : (
            todos.map((todo) => <TodoComponent key={todo.id} todo={todo} reload={reload} />)
          )}
        </main>
      </div>

      {/* toast container */}
      <ToastContainer />
    </>
  );
};

export default Home;
