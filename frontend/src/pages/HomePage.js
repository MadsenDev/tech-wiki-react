// src/pages/HomePage.js
import React from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Welcome to the Tech Support Wiki</h1>
        <p className="text-neutral-700 max-w-2xl mx-auto">
          Your one-stop destination for troubleshooting, setup guides, and tech solutions.
          Browse our guides and categories, and get the support you need.
        </p>
      </section>

      {/* Featured Guides */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <Card
              key={index}
              title={`Guide Title ${index}`}
              footer="Updated Recently"
              actions={<Button variant="primary">Read More</Button>}
            >
              <p>This is a brief summary of guide {index}. Explore the guide to learn more.</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[{name: "Networking"}, {name: "Operating Systems"}, {name: "Hardware Issues"}, {name: "Security"}].map((category, index) => (
            <Card key={index} title={category.name} actions={<Button variant="secondary" size="sm">Explore</Button>} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;