import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default TaskList;