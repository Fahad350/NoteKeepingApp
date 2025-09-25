import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import CardNote from "../components/CardNote";

function Home() {
  const { notes, loading } = useContext(NoteContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }
  if (notes.length === 0) {
    return (
      <div>
        <p className="text-lg text-gray-600">No Data Found!</p>
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {notes.map((note) => (
        <CardNote key={note._id} note={note} />
      ))}
    </div>
  );
}

export default Home;
