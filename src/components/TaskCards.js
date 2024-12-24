
import React, { useState } from 'react';

const TaskCard = ({ task, onUpdateStatus, onDelete }) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Update the local status state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(task.id, status); // Call the update function with task ID and new status
  };

  const handleDelete = () => {
    onDelete(task.id); // Call the delete function with task ID
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 mb-6">
      <h3 className="text-2xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">Status: <strong>{task.status}</strong></p>
    </div>
  );
};

export default TaskCard;
