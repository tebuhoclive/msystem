// ... (import statements and other code)
import "./Login.css"
import { observer } from "mobx-react-lite";
import { useState, FormEvent } from "react";




// Rest of your code

import { useAppContext } from "../shared/functions/Context";
import { useNavigate } from "react-router-dom";

const Login = observer(() => {
  const { api, store } = useAppContext();
  const navigate = useNavigate();
  
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const logoSrc = "/images/Landing.jpg";
  const [loggingloading, setLogginLoading] = useState(false);

 const login = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setLogginLoading(true);

   try {
     const { email, password } = signInForm;

     // Assume that your signIn function logs the user in successfully
     const user = await api.auth.signIn(email, password);

     if (user) {
       console.log("User is logged in");
       navigate("/in"); // Redirect to the "out" route
     } else {
       console.log("Could not login. Try again.");
     }
   } catch (error) {
     console.log(error);
   } finally {
     setLogginLoading(false);
   }
 };


  return (
    <div className="logged-out" style={{ backgroundImage: `url(${logoSrc})` }}>
      <div className="login">
        <h3 className="login-title">Please Login</h3>
        <form className="login-form" onSubmit={login}>
          <div className="form-group">
            <label htmlFor="user-login-email">Email</label>
            <input
              id="user-login-email"
              type="email"
              placeholder="Email"
              value={signInForm.email}
              onChange={(e) =>
                setSignInForm({
                  ...signInForm,
                  email: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-login-password">Password</label>
            <input
              id="user-login-password"
              type="password"
              placeholder="Password"
              value={signInForm.password}
              onChange={(e) =>
                setSignInForm({
                  ...signInForm,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-controls">
            <button
              className="login-button"
              type="submit"
              onClick={() => login}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Login;



