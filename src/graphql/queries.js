import { gql } from '@apollo/client';

// Query: Get all users
export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      admin
    }
  }
`;

// Query: Get all tasks
export const GET_TASKS_QUERY = gql`
  query GetTasks {
    getTasks {
      id
      title
      description
      status
    }
  }
`;

// Mutation: Add a new task
export const ADD_TASK_MUTATION = gql`
  mutation AddTask($title: String!, $description: String, $status: String!) {
    addTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

// Mutation: Update the status of a task
export const UPDATE_TASK_STATUS_MUTATION = gql`
  mutation UpdateTaskStatus($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      title
      description
      status
    }
  }
`;

// Mutation: Delete a task
export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      title
      description
    }
  }
`;

// Mutation: Delete a user (Admin only)
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

// Mutation: Sign up a new user
export const SIGNUP_MUTATION = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    SignUp(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

// Mutation: Log in a user
export const LOGIN_MUTATION = gql`
  mutation LogIn($email: String!, $password: String!) {
    LogIn(email: $email, password: $password)
  }
`;
