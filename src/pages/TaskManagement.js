// // src/pages/TaskManagement.js
// import React from 'react';
// import TaskCard from '../components/TaskCard';
// import Form from '../components/Form';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_TASKS_QUERY, ADD_TASK_MUTATION, UPDATE_TASK_STATUS_MUTATION } from '../graphql/queries';

// const TaskManagement = () => {
//   const { data, loading, error } = useQuery(GET_TASKS_QUERY);
//   const [addTask] = useMutation(ADD_TASK_MUTATION, {
//     refetchQueries: [{ query: GET_TASKS_QUERY }],
//   });
//   const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS_MUTATION, {
//     refetchQueries: [{ query: GET_TASKS_QUERY }],
//   });

//   if (loading) return <p className="text-center text-quaternary">Loading...</p>;
//   if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

//   const handleAddTask = (task) => {
//     addTask({
//       variables: {
//         title: task.title,
//         description: task.description,
//         status: task.status || 'Pending',
//       },
//     }).catch((err) => console.error('Error adding task:', err.message));
//   };

  

//   const handleUpdateStatus = (id, status) => {
//     updateTaskStatus({ variables: { id, status } }).catch((err) => console.error('Error updating task status:', err.message));
//   };

//   return (
//     <div className="p-6 space-y-8 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-semibold text-primary">Task Management</h1>
//       <Form onSubmit={handleAddTask} />
//       <section>
//         <h2 className="text-2xl font-semibold text-secondary">Tasks</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
//           {data.getTasks.map((task) => (
//             <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateStatus} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default TaskManagement;


import React from 'react';
import TaskCard from '../components/TaskCard';
import Form from '../components/Form';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS_QUERY, ADD_TASK_MUTATION, UPDATE_TASK_STATUS_MUTATION, DELETE_TASK_MUTATION } from '../graphql/queries';
import { toast } from 'react-toastify';

const TaskManagement = () => {
  const { data, loading, error } = useQuery(GET_TASKS_QUERY);
  const [addTask] = useMutation(ADD_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
  });
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
  });
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
  });

  if (loading) return <p className="text-center text-quaternary">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  const handleAddTask = (task) => {
    try {
      addTask({
        variables: {
          title: task.title,
          description: task.description,
          status: task.status || 'Pending',
        },
      });
      toast.success("Task added successfully");
    } catch (error) {
      toast.error('Error adding task:', error.message);
    }
  };

  const handleUpdateStatus = (id, status) => {
    try{
      updateTaskStatus({ variables: { id, status } })
      toast.success("Task updated successfully");
    }
    catch(err){
      toast.error('Error updating task status:', err.message)
    };
  };

  const handleDeleteTask = (id) => {
    try{
      deleteTask({ variables: { id } });
      toast.success('Task deleted successfully');
    }
    catch(err){
      toast.error('Error deleting task:', err.message)
    };
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-primary">Task Management</h1>
      <Form onSubmit={handleAddTask} />
      <section>
        <h2 className="text-2xl font-semibold text-secondary">Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {data.getTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteTask} // Pass the delete handler
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskManagement;
