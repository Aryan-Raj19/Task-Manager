import React from 'react';

const TaskForm = ({ name, description, onNameChange, onDescriptionChange, onSubmit, isEditing }) => {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={onNameChange}
        required
        style={{ width: '70%', padding: '10px', marginBottom: '10px', display: 'block' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={onDescriptionChange}
        style={{ width: '70%', padding: '10px', marginBottom: '10px', display: 'block' }}
      />
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none' }}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;