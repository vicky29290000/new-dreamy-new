import React, { useState } from "react";

type Role = "super-admin" | "admin" | "architect" | "structural-team" | "customer";

interface DocumentItem {
  id: number;
  name: string;
  uploaded: string;
}

const Documents: React.FC<{ role: Role }> = ({ role }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: 1, name: "Document 1.pdf", uploaded: "2 days ago" },
    { id: 2, name: "Document 2.pdf", uploaded: "3 days ago" },
    { id: 3, name: "Document 3.pdf", uploaded: "1 week ago" },
    { id: 4, name: "Document 4.pdf", uploaded: "5 days ago" },
  ]);

  const canEdit = ["super-admin", "admin", "architect"].includes(role);

  const handleNameChange = (id: number, value: string) => {
    setDocuments(documents.map(doc => doc.id === id ? { ...doc, name: value } : doc));
  };

  const handleAddDocument = () => {
    const newDoc: DocumentItem = {
      id: documents.length + 1,
      name: "New Document.pdf",
      uploaded: "Just now",
    };
    setDocuments([...documents, newDoc]);
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Documents</h1>

      {canEdit && (
        <button
          onClick={handleAddDocument}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Document
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 border rounded-lg hover:shadow-md transition">
            {canEdit ? (
              <>
                <input
                  className="font-semibold w-full border p-1 rounded mb-1"
                  value={doc.name}
                  onChange={(e) => handleNameChange(doc.id, e.target.value)}
                />
                <button
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </>
            ) : (
              <p className="font-semibold">{doc.name}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">{doc.uploaded}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
