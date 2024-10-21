import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function MainComponent() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <h1>TODO</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
