import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
            
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" name="" id="" placeholder="Enter your email" />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
          />
          <input className="file-hidden" type="file" name="file" id="file" />

          <button>Sign In</button>
        </form>
        {error && <span>Something is wrong!!</span>}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
