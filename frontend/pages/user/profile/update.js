import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import styled from "styled-components";
import withUser from "../../withUser";
import { updateUser } from "../../../helpers/auth";

const Profile = ({ user, token }) => {
  const [state, setState] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmed: "",
    error: "",
    success: "",
    buttonText: "Update",
  });
  // state에 향후 추가
  //  loadedCategories: [],
  // categories: user.categories

  // const { name, email, password, error, success, buttonText, loadedCategories, categories } = state;
  const {
    name,
    email,
    password,
    error,
    success,
    buttonText,
    confirmed,
  } = state;

  //   useEffect(() => {
  //     loadCategories();
  //   }, []);

  //   const loadCategories = async () => {
  //       const response = await axios.get(`${API}/categories`);
  //       setState({...state, loadedCategories: response.data})
  //   }

  // const handleToggle = c => () => {
  //     // return the first index or -1
  //     const clickedCategory = categories.indexOf(c);
  //     const all = [...categories];

  //     if (clickedCategory === -1) {
  //         all.push(c);
  //     } else {
  //         all.splice(clickedCategory, 1);
  //     }
  //     console.log('all >> categories', all);
  //     setState({ ...state, categories: all, success: '', error: '' });
  // };

  // // show categories > checkbox
  // const showCategories = () => {
  //     return (
  //         loadedCategories &&
  //         loadedCategories.map((c, i) => (
  //             <li className="list-unstyled" key={c._id}>
  //                 <input
  //                     type="checkbox"
  //                     onChange={handleToggle(c._id)}
  //                     checked={categories.includes(c._id)}
  //                     className="mr-2"
  //                 />
  //                 <label className="form-check-label">{c.name}</label>
  //             </li>
  //         ))
  //     );
  // };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Update",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == confirmed) {
      setState({ ...state, buttonText: "Updating..." });
      try {
        const response = await axios.put(
          `${API}/user`,
          {
            name,
            password,
            //   categories,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        updateUser(response.data, () => {
          setState({
            ...state,
            buttonText: "Updated",
            success: "Profile updated successfully",
          });
        });
      } catch (error) {
        // console.log(error);
        setState({
          ...state,
          buttonText: "Update",
          error: error.response.data.error,
        });
      }
    } else {
      setState({ ...state, error: "Password and Confirmed does not match" });
    }
  };

  //   const updateForm = () => (
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <input
  //           value={name}
  //           onChange={handleChange("name")}
  //           type="text"
  //           placeholder="Type your name"
  //           required
  //         />
  //       </div>
  //       <div>
  //         <input
  //           value={email}
  //           onChange={handleChange("email")}
  //           type="email"
  //           placeholder="Type your email"
  //           required
  //           disabled
  //         />
  //       </div>
  //       <div>
  //         <input
  //           value={password}
  //           onChange={handleChange("password")}
  //           type="password"
  //           placeholder="Type your password"
  //         />
  //       </div>

  //       <div>
  //         <label>Category</label>
  //         <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
  //           {showCategories()}
  //         </ul>
  //       </div>

  //       <div>
  //         <button>{buttonText}</button>
  //       </div>
  //     </form>
  //   );

  const updateForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <span>Name</span>
        <input
          value={name}
          onChange={handleChange("name")}
          type="text"
          placeholder="Type your name"
          required
        />
      </FormGroup>
      <FormGroup>
        <span>Email</span>
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          placeholder="Type your email"
          required
          disabled
        />
      </FormGroup>
      <FormGroup>
        <span>Password</span>
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          placeholder="Type your password"
        />
      </FormGroup>

      <FormGroup>
        <span>Confirmed</span>
        <input
          value={confirmed}
          onChange={handleChange("confirmed")}
          type="password"
          placeholder="Type your password again"
        />
      </FormGroup>

      <FormGroup style={{ marginTop: "1rem" }}>
        <button>{buttonText}</button>
      </FormGroup>
    </Form>
  );

  return (
    <Container>
      <Row>
        <Header>Update Profile</Header>
        {success && (
          <SuccessAlert>
            <span>{success}</span>
          </SuccessAlert>
        )}
        {error && (
          <ErrorAlert>
            <span>{error}</span>
          </ErrorAlert>
        )}
        {updateForm()}
      </Row>
    </Container>
  );
};

export default withUser(Profile);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  margin-top: 1rem;
`;

const SuccessAlert = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  margin-top: 1rem;
  background: #cce5ff;
  width: 60%;
  height: 5vh;
  text-align: center;
  font-size: 1rem;

  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ErrorAlert = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  margin-top: 1rem;
  background: #f8d7da;
  width: 60%;
  height: 5vh;
  text-align: center;
  font-size: 1rem;

  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 10vh;

  span {
    display: block;
    margin-bottom: 10px;
  }

  input {
    border: 2px solid #ffa500;
    height: 5vh;
    width: 100%;
    border-radius: 10px;
    padding: 1rem;
    outline: none;
  }

  button {
    display: block;
    color: #ffa500;
    background: white;
    width: 100%;
    height: 5vh;
    font-size: 15px;
    font-weight: bold;
    margin-top: 0.8rem;
    border-radius: 10px;
    border: 2px solid #ffa500;
    outline: none;

    :hover {
      background: #ffa500;
      color: white;
    }
  }
`;
