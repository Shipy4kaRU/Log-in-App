import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "./auth-context";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_EMAIL_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  }
  if (action.type === "EMAIL_VALIDITY") {
    return {
      value: prevState.value,
      isValid: action.value,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (prevState, action) => {
  if (action.type === "USER_PASSWORD_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 6,
    };
  }
  if (action.type === "PASSWORD_VALIDITY") {
    return {
      value: prevState.value,
      isValid: action.value,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const ctx = useContext(AuthContext);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const { isValid: emailValidity } = emailState;
  const { isValid: passwordValidity } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Main function");
      setFormIsValid(emailValidity && passwordValidity);
    }, 500);
    return () => {
      console.log("Clear function");
      clearTimeout(timer);
    };
  }, [emailValidity, passwordValidity]);

  const emailChangeHandler = (e) => {
    dispatchEmailState({
      type: "USER_EMAIL_INPUT",
      value: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    dispatchPasswordState({
      type: "USER_PASSWORD_INPUT",
      value: e.target.value,
    });
  };

  const validateEmailHandler = (e) => {
    dispatchEmailState({
      type: "EMAIL_VALIDITY",
      value: e.target.value.includes("@"),
    });
  };

  const validatePasswordHandler = (e) => {
    dispatchPasswordState({
      type: "PASSWORD_VALIDITY",
      value: e.target.value.trim().length > 6,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) ctx.onLogin(emailState.value, passwordState.value);
    else if (!emailValidity) {
      emailInputRef.current.focus();
    } else if (!passwordValidity) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="Email"
          type="email"
          isValid={emailValidity}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordValidity}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={styles.actions}>
          <Button
            type="submit"
            className={styles.btn} /*disabled={!formIsValid}*/
          >
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
