"use client";
import { useSession } from "next-auth/react";

function App() {
  const session = useSession();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="">{JSON.stringify(session)}</div>
      <form>
        <button type="submit">Se deconnerter</button>
      </form>
    </div>
  );
}

export default App;
