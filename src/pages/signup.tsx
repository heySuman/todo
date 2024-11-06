import { FormEvent, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.code);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="error-message">{error && error.split("/")[1]}</p>
        <button type="submit">Create</button>
        <Link to={"/login"}>Already have an account? Login here</Link>
      </form>
    </div>
  );
}
