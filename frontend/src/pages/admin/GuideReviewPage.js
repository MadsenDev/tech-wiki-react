import React, { useState, useEffect } from "react";
import { useGuides } from "../../hooks/useGuides";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Header from "../../components/common/Header";
import ReactMarkdown from "react-markdown";

const GuideReviewPage = () => {
  const { guides, fetchGuides, updateGuide, deleteGuide } = useGuides();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    fetchGuides("under_review"); // Fetch guides with "under_review" status
  }, [fetchGuides]);

  const openModal = (guide) => {
    setSelectedGuide(guide);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGuide(null);
    setModalOpen(false);
  };

  const handlePublish = async () => {
    if (selectedGuide) {
      await updateGuide(selectedGuide.id, { status: "published" });
      closeModal();
      fetchGuides("under_review"); // Refresh the list
    }
  };

  const handleDelete = async () => {
    if (selectedGuide) {
      await deleteGuide(selectedGuide.id);
      closeModal();
      fetchGuides("under_review"); // Refresh the list
    }
  };

  return (
    <div>
      <Header size="h1" color="primary" align="left" className="mb-6">
        Review Submitted Guides
      </Header>

      {guides.length === 0 ? (
        <p className="text-neutral-600">No guides to review at the moment.</p>
      ) : (
        <table className="w-full bg-neutral-700 rounded-lg shadow-lg text-neutral-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Submitted On</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide) => (
              <tr key={guide.id} className="border-t border-neutral-60">
                <td className="px-4 py-2">{guide.title}</td>
                <td className="px-4 py-2">
                  {guide.author
                    ? `${guide.author.firstName} ${guide.author.lastName}`
                    : "Unknown"}
                </td>
                <td className="px-4 py-2">
                  {new Date(guide.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex justify-around">
                  <Button variant="primary" onClick={() => openModal(guide)}>
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedGuide && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Review Guide" wide={true}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">
              {selectedGuide.title}
            </h2>
            <p className="text-sm text-neutral-600">
              <strong>Author:</strong>{" "}
              {selectedGuide.author
                ? `${selectedGuide.author.firstName} ${selectedGuide.author.lastName}`
                : "Unknown"}
            </p>
            <p className="text-sm text-neutral-600">
              <strong>Slug:</strong>{" "}
              {selectedGuide.author
                ? `${selectedGuide.slug}`
                : "Unknown"}
            </p>
            <div className="border p-4 rounded-lg bg-gray-50">
              <ReactMarkdown>{selectedGuide.content}</ReactMarkdown>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="success" onClick={handlePublish}>
                Publish
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GuideReviewPage;