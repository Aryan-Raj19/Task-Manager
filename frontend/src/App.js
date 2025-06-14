import React, { useEffect, useState } from 'react';
import TaskForm from './Components/TaskForm.js';
import TaskList from './Components/TaskList.js';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch {
      setError('Failed to fetch tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error();
      await fetchTasks();
      setName('');
      setDescription('');
      setEditingId(null);
    } catch {
      setError('Error submitting task');
    }
  };

  const handleEdit = (task) => {
    setName(task.name);
    setDescription(task.description);
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch {
      setError('Error deleting task');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <TaskForm
        name={name}
        description={description}
        onNameChange={(e) => setName(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onSubmit={handleSubmit}
        isEditing={!!editingId}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;