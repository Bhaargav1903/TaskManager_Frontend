// import React, { useState } from 'react';

// const TaskCard = ({ task, onUpdateStatus }) => {
//   const [status, setStatus] = useState(task.status);

//   const handleStatusChange = (e) => {
//     setStatus(e.target.value); // Update the local status state
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdateStatus(task.id, status); // Call the update function with task ID and new status
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 mb-6">
//       <h3 className="text-2xl font-semibold">{task.title}</h3>
//       <p>{task.description}</p>
//       <p className="text-sm text-gray-500">Status: <strong>{task.status}</strong></p>

//       <form onSubmit={handleSubmit} className="space-y-2">
//         <label htmlFor={`status-${task.id}`} className="block text-sm text-gray-700">Update Status:</label>
//         <select
//           id={`status-${task.id}`}
//           value={status}
//           onChange={handleStatusChange}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//         >
//           <option value="Pending">Pending</option>
//           <option value="Completed">Completed</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TaskCard;


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

      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor={`status-${task.id}`} className="block text-sm text-gray-700">Update Status:</label>
        <select
          id={`status-${task.id}`}
          value={status}
          onChange={handleStatusChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Update
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
