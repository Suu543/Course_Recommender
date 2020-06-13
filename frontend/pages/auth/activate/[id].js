import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  ActivationWrapper,
  ActivationHeading,
  ActivationButton,
  ActivationSuccessAlert,
  ActivationErrorAlert,
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

  // useEffect method의 componentDidMount가 오직 compononet mounting이 끝나고 실행되기 때문에
  // SSR 관점에서 원하고자 하는 데이터를 랜더링하는데 적합하지않다.
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
      console.log("account activate response", response);
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
      {success && <ActivationSuccessAlert>{success}</ActivationSuccessAlert>}
      {error && <ActivationErrorAlert>{error}</ActivationErrorAlert>}
      <ActivationHeading>
        Hello {name}, Are you ready to activate your account?
      </ActivationHeading>
      <br />
      <ActivationButton onClick={clickSubmit}>{buttonText}</ActivationButton>
    </ActivationWrapper>
  );
};

export default withRouter(ActivateAccount);

// const ActivateAccount = ({ router }) => {
//   return <div>{JSON.stringify(router)}</div>;
// };
