import "../Styles/TaskItem.css";
import "../Styles/Responsive.css";

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-item">
      <div className="task-details">
        <strong>{task.name}</strong>
        <p className="task-desc">{task.description}</p>
      </div>
      <div className="buttons">
        <button className="btn edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
