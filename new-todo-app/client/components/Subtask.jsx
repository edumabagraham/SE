import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../network/api';

const Subtask = ({ subtask, reload }) => {
  const [checked, setChecked] = useState(subtask.status === 1);

  const subtaskStatusChanged = async (checked) => {
    setChecked(checked);
    await api.patch(`/api/subtasks/${subtask.id}`, { status: checked ? 'completed' : 'pending' });
    toast.success('Subtask status updated');
    reload();
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => subtaskStatusChanged(e.target.checked)}
      />{' '}
      <span>{subtask.title}</span>
    </div>
  );
};

export default Subtask;
