import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  ShowSuccessAlert,
  ShowErrorAlert,
} from "../../../components/Helper/alert";
import {
  ActivationWrapper,
  ActivationHeading,
  ActivationButton,
} from "../../../components/Activation/ActivationElements";
import { API } from "../../../config";

const ActivateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = state;

  useEffect(() => {
    //   Extract Information from JWT
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, [router]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    // console.log("Activate Account!");
    setState({ ...state, buttonText: "Activating" });

    try {
      const response = await axios.post(`${API}/register/activate`, { token });
      //  console.log("account activate response", response);
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Activated",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Activate Account",
        error: error.response.data.error,
      });
    }
  };

  return (
    <ActivationWrapper>
      <ActivationHeading>
        Hello {name}, Are you ready to activate your account?
      </ActivationHeading>
      <br />
      {success && <ShowSuccessAlert>{success}</ShowSuccessAlert>}
      {error && <ShowErrorAlert>{error}</ShowErrorAlert>}
      <ActivationButton onClick={clickSubmit}>{buttonText}</ActivationButton>
    </ActivationWrapper>
  );
};

export default withRouter(ActivateAccount);

// const ActivateAccount = ({ router }) => {
//   return <div>{JSON.stringify(router)}</div>;
// };
