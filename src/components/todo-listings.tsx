import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Loading } from "./loading";

type todosType = {
  id: string;
  data: DocumentData;
};

export default function TodoListing() {
  const [todos, setTodos] = useState<todosType[] | null>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchTodosListing() {
      try {
        setLoading(true);
        const todosRef = collection(db, "todos");
        const q = query(
          todosRef,
          where("userRef", "==", auth.currentUser && auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (doc) => {
          const todosListing: todosType[] = [];
          doc.forEach((doc) =>
            todosListing.push({ id: doc.id, data: doc.data() })
          );
          setTodos(todosListing);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchTodosListing();
  }, []);

  //   handle deletion of the todo
  const handleDelete = async (docId: string) => {
    if (confirm("Do you want to delete this todo?")) {
      await deleteDoc(doc(db, "todos", docId));
    }
  };

  //   handle completion chnage
  const handleCompletion = async (docId: string, checked: boolean) => {
    await updateDoc(doc(db, "todos", docId), { completed: checked });
  };

  if (loading) return <Loading />;
  return (
    <section>
      {todos ? (
        todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="w-[50%] rounded border bg-gray-200 shadow-sm flex p-2 mx-auto my-1 gap-2 justify-between"
            >
              <input
                type="checkbox"
                name="complete-checkbox"
                id="complete-checkbox"
                onChange={(e) => {
                  handleCompletion(todo.id, e.target.checked);
                }}
              />
              <p className={`${todo.data?.completed && "line-through"}`}>
                {todo.data?.todo}
              </p>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(todo.id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">
          Please add an item in the todo!
        </p>
      )}
    </section>
  );
}
