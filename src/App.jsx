import React from "react";
import { Layout } from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import AllToys from "./components/pages/AllToys";
import AddToy from "./components/pages/AddToy";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
        <Route path="/" element={<AllToys />} />
          <Route path="/add-toy" element={<AddToy />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
