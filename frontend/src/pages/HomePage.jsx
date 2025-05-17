import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const HomePage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center bg-gray-100">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Find Your Perfect Student Stay
        </h1>
        <p className="mb-6 text-gray-600">
          Browse verified rooms and apartments near your college.
        </p>
        <Link to="/listings">
          <Button>Browse Listings </Button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
