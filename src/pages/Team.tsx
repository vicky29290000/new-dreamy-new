import React, { useState, useMemo } from "react";

type Role = "super-admin" | "admin" | "architect" | "structural-team" | "customer";

interface TeamMember {
  name: string;
  role: string;
}

interface TeamProps {
  role: Role;
  userName: string;
  addNotification?: (msg: string) => void;
}

const Team: React.FC<TeamProps> = ({ role, userName, addNotification }) => {
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "Alex Morgan", role: "Super Admin" },
    { name: "John Smith", role: "Architect" },
    { name: "Sarah Johnson", role: "Structural Team" },
    { name: "Emma Brown", role: "Customer" },
  ]);

  const canEdit = ["super-admin", "admin", "architect"].includes(role);

  const handleChange = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    const newMember = { name: "New Member", role: "New Role" };
    setMembers([...members, newMember]);
    addNotification?.(`Added new member: ${newMember.name}`);
  };

  const removeMember = (index: number) => {
    const removed = members[index];
    setMembers(members.filter((_, i) => i !== index));
    addNotification?.(`Removed member: ${removed.name}`);
  };

  const filteredMembers = useMemo(() => members, [members]); // placeholder for future search/filter

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        {canEdit && (
          <button
            onClick={addMember}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Member
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg flex items-center space-x-4 hover:shadow-md transition"
          >
            {/* Avatar */}
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-gray-600 font-bold">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>

            {/* Name & Role */}
            <div className="flex-1">
              {canEdit ? (
                <>
                  <input
                    className="font-semibold w-full border p-1 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={member.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                  />
                  <input
                    className="text-sm text-gray-500 w-full border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={member.role}
                    onChange={(e) => handleChange(index, "role", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </>
              )}
            </div>

            {/* Remove button */}
            {canEdit && (
              <button
                onClick={() => removeMember(index)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
