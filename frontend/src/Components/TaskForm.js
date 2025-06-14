import "../Styles/TaskForm.css";
import "../Styles/Responsive.css"

const TaskForm = ({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onSubmit,
  isEditing,
}) => {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <h1>Add New Task</h1>
      <div className="task-input">
        <input
          className="title-input input-field"
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={onNameChange}
          required
          style={{}}
        />
        <button className="submit-btn" type="submit">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      <input
        className="desc-input input-field"
        type="text"
        placeholder="Description"
        value={description}
        onChange={onDescriptionChange}
      />
    </form>
  );
};

export default TaskForm;
