import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../network/api';
import styles from '../styles/todo.module.scss';
import Subtask from './Subtask';

const TodoComponent = ({ todo, reload }) => {
  const [isActive, setIsActive] = useState(false);
  const [subtaskInput, setSubTaskInput] = useState('');
  const [checked, setChecked] = useState(todo.status === 1);
  const [loading, setLoading] = useState(false);

  const updateTodo = async (checked) => {
    setChecked(checked);
    await api.patch(`/api/todos/${todo.id}`, { status: checked ? 'completed' : 'pending' });
    toast.success('Todo status updated!');
    reload();
  };

  const addSubTask = async () => {
    if (!subtaskInput) {
      toast.error('Please enter a title');
      return;
    }
    setLoading(true);
    try {
      await api.post(`/api/subtasks`, {
        title: subtaskInput,
        todo_id: todo.id,
      });
      toast.success('Subtask added');
      reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong, unable to add subtask');
    }
  };

  return (
    <div className={styles.accordion_item}>
      <div className={styles.accordion_title} onClick={() => setIsActive(!isActive)}>
        <div>
          <input type="checkbox" checked={checked} onChange={(e) => updateTodo(e.target.checked)} />{' '}
          <span>{todo.title}</span>
        </div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      <div className={styles.summary_section}>
        <span>{`${todo.subtasks?.filter((todo) => todo.status === 1).length || 0} of ${
          todo.subtasks?.length || 0
        } completed`}</span>
      </div>
      {isActive && (
        <div className={styles.accordion_content}>
          {todo.subtasks?.map((subtask) => (
            <Subtask subtask={subtask} key={subtask.id} reload={reload} />
          ))}
          <div>
            <input
              type="text"
              placeholder="What are the steps?"
              className="sub-task-input"
              value={subtaskInput}
              onChange={(e) => setSubTaskInput(e.target.value)}
              disabled={loading}
            />
            <button className="add-task-btn" disabled={loading} onClick={addSubTask}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoComponent;
