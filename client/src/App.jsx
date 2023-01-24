import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, CreatePost, Error } from "./pages";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <Router>
      <Header />
      <main className=" sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </Router>
  );
};
