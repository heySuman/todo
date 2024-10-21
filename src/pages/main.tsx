import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

export default function MainComponent() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const [todo, setTodo] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), { todo: todo });
      console.log(docRef.id);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1>TODO</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo-input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
