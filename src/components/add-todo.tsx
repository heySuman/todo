import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { auth, db } from "../../firebase";
import { FaPlus } from "react-icons/fa";

export default function AddTodo() {
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const docRef = collection(db, "todos");
      await addDoc(docRef, {
        todo: inp,
        userRef: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
        completed: false,
      });
      alert("todo added!");
      setInp("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Could not add the todo!");
      console.log(error);
    }
  };

  return (
    <form
      className="w-[100%] mx-auto flex items-center justify-center my-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={inp}
        disabled={loading}
        onChange={(e) => setInp(e.target.value)}
        placeholder="what do you want to do today?"
        className="border border-black p-1 rounded w-[350px]"
      />
      <button
        className="bg-green-500 w-[30px] h-[30px] text-white rounded grid place-items-center"
        type="submit"
      >
        <FaPlus />
      </button>
    </form>
  );
}
