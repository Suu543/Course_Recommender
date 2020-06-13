import { useEffect, useState } from "react";
import axios from "axios";

const User = ({ todos }) => {
  console.log(todos);
  return (
    <div>
      <h1>Hello</h1>
      <p>{JSON.stringify(todos)}</p>
    </div>
  );
};

User.getInitialProps = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos`
  );

  return {
    todos: response.data,
  };
};

export default User;
