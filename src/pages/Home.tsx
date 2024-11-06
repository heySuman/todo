import { signOut } from "firebase/auth";
import AddTodo from "../components/add-todo";
import TodoListing from "../components/todo-listings";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <main className="w-[60%] mx-auto my-6">
      <h1 className="text-3xl font-bold text-center">TODO</h1>
      <AddTodo />
      <TodoListing />
      <div className="absolute bottom-0 left-0 p-5">
        <button className="bg-blue-400 p-3 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </main>
  );
}
