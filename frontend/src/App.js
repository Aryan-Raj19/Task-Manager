import { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm.js";
import TaskList from "./Components/TaskList.js";
import "./App.css";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch {
      setError("Failed to fetch tasks");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error();
      await fetchTasks();
      setName("");
      setDescription("");
      setEditingId(null);
    } catch {
      setError("Error submitting task");
    }
  };

  const handleEdit = (task) => {
    setName(task.name);
    setDescription(task.description);
    setEditingId(task.id);
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/${taskToDelete}`, { method: "DELETE" });
      fetchTasks();
      setShowConfirm(false);
      setTaskToDelete(null);
    } catch {
      setError("Error deleting task");
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  return (
    <div className="app-container">
      <TaskForm
        name={name}
        description={description}
        onNameChange={(e) => setName(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onSubmit={handleSubmit}
        isEditing={!!editingId}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {showConfirm && (
        <div className="confirm-box">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this task?</p>
          <div className="confirm-btns">
            <button className="btns confirm-delete-btn" onClick={confirmDelete}>
              Yes, Delete
            </button>
            <button className="btns cancle-btn" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
