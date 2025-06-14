import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
      <strong>{task.name}</strong>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task)} style={{ marginRight: '10px', padding: '5px 10px' }}>Edit</button>
      <button onClick={() => onDelete(task.id)} style={{ padding: '5px 10px', color: 'white', backgroundColor: 'red', border: 'none' }}>Delete</button>
    </div>
  );
};

export default TaskItem;
