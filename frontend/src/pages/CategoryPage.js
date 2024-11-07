import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGuides } from "../hooks/useGuides";
import Header from "../components/common/Header";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import dateTextGenerator from "../utils/dateTextGenerator";

const CategoryPage = () => {
  const { slug } = useParams();
  const { guides, error, fetchGuidesByCategory } = useGuides();

  useEffect(() => {
    if (slug) fetchGuidesByCategory(slug);
  }, [slug]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <Header size="h1" color="primary" align="center" className="mb-6">
        Guides for {slug.replace(/-/g, " ")}
      </Header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card
            key={guide.id}
            title={guide.title}
            footer={dateTextGenerator(guide.createdAt, guide.updatedAt)} // Pass footer text
            actions={
              <Link to={`/guide/${guide.slug}`}>
                <Button variant="primary" size="sm">
                  Read More
                </Button>
              </Link>
            }
          >
            <p>{guide.summary}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;