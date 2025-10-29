import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ---- Types ----
export interface ProjectFile {
  file: File;
  uploadedBy: string;
  approvedForCustomer?: boolean;
}

export interface Project {
  id: number;
  name: string;
  customer: string;
  status: "Planning" | "In Progress" | "Review" | "Completed";
  progress: number;
  assignedRoles: string[];
  lastUpdatedBy?: string;
  designPackage?: string;
  files?: {
    [packageId: string]: ProjectFile[];
  };
}

interface ProjectsProps {
  role: string;
  userName: string;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addNotification?: (message: string) => void;
}

// ---- Constants ----
const designPackages = [
  { id: "good-plus", name: "Good Plus" },
  { id: "better-plus", name: "Better Plus" },
  { id: "quad-plus", name: "Quad Plus" },
  { id: "luxury-plus", name: "Luxury Plus" },
];

const allRoles = ["Architect", "Structural", "Customer", "Admin", "Super Admin"];

// ---- Project Form Component ----
const ProjectForm = ({ role, userName, projects, setProjects, addNotification }: ProjectsProps) => {
  const [newProjectName, setNewProjectName] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");

  const addProject = () => {
    if (!newProjectName || !newCustomerName) {
      alert("Please enter project and customer names");
      return;
    }

    const defaultRoles = role.toLowerCase() === "customer" ? ["Customer"] : ["Architect"];
    const newProj: Project = {
      id: projects.length + 1,
      name: newProjectName,
      customer: newCustomerName,
      status: "Planning",
      progress: 0,
      assignedRoles: defaultRoles,
      lastUpdatedBy: userName,
      files: {},
    };

    setProjects([...projects, newProj]);
    setNewProjectName("");
    setNewCustomerName("");
    addNotification?.(`Project "${newProj.name}" added by ${userName}`);
  };

  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Project Name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
        className="border px-2 py-1 rounded w-1/3"
      />
      <input
        type="text"
        placeholder="Customer Name"
        value={newCustomerName}
        onChange={(e) => setNewCustomerName(e.target.value)}
        className="border px-2 py-1 rounded w-1/3"
      />
      <Button onClick={addProject}>Add Project</Button>
    </div>
  );
};

// ---- File Upload Component ----
interface FileUploadProps {
  p: Project;
  role: string;
  userName: string;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addNotification?: (msg: string) => void;
}

const FileUploadSection = ({ p, role, userName, projects, setProjects, addNotification }: FileUploadProps) => {
  const roleLower = role.toLowerCase();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadedFiles: ProjectFile[] = Array.from(e.target.files).map((file) => ({
      file,
      uploadedBy: userName,
      approvedForCustomer: roleLower !== "customer",
    }));

    setProjects(
      projects.map((pr) => {
        if (pr.id === p.id) {
          const updatedFiles = {
            ...pr.files,
            [p.designPackage!]: [...(pr.files?.[p.designPackage!] || []), ...uploadedFiles],
          };
          return { ...pr, files: updatedFiles, lastUpdatedBy: userName };
        }
        return pr;
      })
    );
    addNotification?.(`Files uploaded for project "${p.name}", package "${p.designPackage}"`);
  };

  const approveFile = (fileIndex: number) => {
    setProjects(
      projects.map((pr) => {
        if (pr.id === p.id) {
          const updatedFiles = {
            ...pr.files,
            [p.designPackage!]: pr.files![p.designPackage!].map((f, i) =>
              i === fileIndex ? { ...f, approvedForCustomer: true } : f
            ),
          };
          return { ...pr, files: updatedFiles };
        }
        return pr;
      })
    );
    addNotification?.(`File approved for Customer by ${userName}`);
  };

  const removeFile = (fileIndex: number) => {
    setProjects(
      projects.map((pr) => {
        if (pr.id === p.id) {
          const updatedFiles = {
            ...pr.files,
            [p.designPackage!]: pr.files![p.designPackage!].filter((_, i) => i !== fileIndex),
          };
          return { ...pr, files: updatedFiles, lastUpdatedBy: userName };
        }
        return pr;
      })
    );
    addNotification?.(`File removed from project "${p.name}"`);
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-1">Files for "{p.designPackage}"</p>
      {roleLower !== "customer" && (
        <input type="file" multiple onChange={handleUpload} className="border p-1 rounded w-full mb-2" />
      )}
      {p.files?.[p.designPackage] && p.files[p.designPackage].length > 0 && (
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {p.files[p.designPackage].map((f, idx) => {
            const canView = roleLower !== "customer" || f.approvedForCustomer;
            if (!canView) return null;

            return (
              <li key={idx} className="flex justify-between items-center">
                <span>
                  {f.file.name} (uploaded by {f.uploadedBy})
                  {roleLower === "customer" && !f.approvedForCustomer && (
                    <span className="text-yellow-600 ml-2">(Pending approval)</span>
                  )}
                </span>
                <div className="flex gap-2">
                  <a href={URL.createObjectURL(f.file)} download={f.file.name} className="text-blue-600 underline">
                    Download
                  </a>
                  {["admin", "super admin"].includes(roleLower) && !f.approvedForCustomer && (
                    <Button size="sm" onClick={() => approveFile(idx)}>
                      Approve for Customer
                    </Button>
                  )}
                  {["architect", "admin", "super admin", "structural"].includes(roleLower) && (
                    <button onClick={() => removeFile(idx)} className="text-red-600 underline">
                      Remove
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// ---- Single Project Card ----
interface ProjectCardProps {
  p: Project;
  role: string;
  userName: string;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addNotification?: (msg: string) => void;
}

const ProjectCard = ({ p, role, userName, projects, setProjects, addNotification }: ProjectCardProps) => {
  const roleLower = role.toLowerCase();

  const updateProgress = (delta: number) => {
    setProjects(
      projects.map((pr) =>
        pr.id === p.id ? { ...pr, progress: Math.min(100, Math.max(0, pr.progress + delta)), lastUpdatedBy: userName } : pr
      )
    );
    addNotification?.(`Project "${p.name}" progress updated by ${userName}`);
  };

  const updateStatus = (status: Project["status"]) => {
    setProjects(
      projects.map((pr) => (pr.id === p.id ? { ...pr, status, lastUpdatedBy: userName } : pr))
    );
    addNotification?.(`Project "${p.name}" status updated to "${status}" by ${userName}`);
  };

  const updateRoles = (selectedRoles: string[]) => {
    setProjects(
      projects.map((pr) =>
        pr.id === p.id ? { ...pr, assignedRoles: selectedRoles, lastUpdatedBy: userName } : pr
      )
    );
    addNotification?.(`Project "${p.name}" roles updated by ${userName}`);
  };

  return (
    <Card className="p-3 hover:bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Info */}
        <div>
          <h3 className="font-medium">{p.name}</h3>
          <p className="text-sm text-gray-500">{p.customer}</p>
        </div>

        {/* Status & Progress */}
        <div className="text-right mt-2 md:mt-0">
          {roleLower !== "customer" ? (
            <select
              value={p.status}
              onChange={(e) => updateStatus(e.target.value as Project["status"])}
              className="border rounded px-1 py-0.5 text-sm"
            >
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>
          ) : (
            <Badge variant={p.status === "Completed" ? "default" : "secondary"}>{p.status}</Badge>
          )}
          <div className="text-sm text-gray-500 mt-1">{p.progress}%</div>
          {p.lastUpdatedBy && <div className="text-xs text-gray-400">Last updated by {p.lastUpdatedBy}</div>}
        </div>

        {/* Progress Buttons */}
        {roleLower !== "customer" && (
          <div className="mt-2 flex gap-2 flex-wrap">
            <Button size="sm" onClick={() => updateProgress(10)}>
              +10%
            </Button>
            <Button size="sm" onClick={() => updateProgress(-10)}>
              -10%
            </Button>
          </div>
        )}

        {/* Role Assignment */}
        {(roleLower === "super admin" || roleLower === "admin") && (
          <div className="mt-2">
            <label className="text-xs text-gray-500">Assigned Roles:</label>
            <select
              multiple
              value={p.assignedRoles}
              onChange={(e) => updateRoles(Array.from(e.target.selectedOptions).map((o) => o.value))}
              className="border rounded px-1 py-0.5 text-sm w-full mt-1"
            >
              {allRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Design Packages */}
      <div className="mt-4">
        <label className="text-sm font-medium">Select Design Package:</label>
        <div className="flex gap-2 mt-1 flex-wrap">
          {designPackages.map((pkg) => (
            <Button
              key={pkg.id}
              size="sm"
              variant={p.designPackage === pkg.id ? "default" : "outline"}
              onClick={() =>
                setProjects(projects.map((pr) => (pr.id === p.id ? { ...pr, designPackage: pkg.id } : pr)))
              }
            >
              {pkg.name}
            </Button>
          ))}
        </div>
      </div>

      {/* File Upload Section */}
      {p.designPackage && (
        <FileUploadSection
          p={p}
          role={role}
          userName={userName}
          projects={projects}
          setProjects={setProjects}
          addNotification={addNotification}
        />
      )}
    </Card>
  );
};

// ---- Main Projects Component ----
const Projects = ({ role, userName, projects, setProjects, addNotification }: ProjectsProps) => {
  const roleLower = role.toLowerCase();

  const visibleProjects = useMemo(() => {
    if (roleLower === "super admin") return projects;
    if (roleLower === "customer") return projects.filter((p) => p.assignedRoles.includes("Customer"));
    return projects.filter((p) => p.assignedRoles.some((r) => r.toLowerCase() === roleLower));
  }, [projects, roleLower]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Manage all your projects here</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm
            role={role}
            userName={userName}
            projects={projects}
            setProjects={setProjects}
            addNotification={addNotification}
          />
          {visibleProjects.length === 0 ? (
            <p className="text-gray-500">No projects to display.</p>
          ) : (
            <div className="space-y-4">
              {visibleProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  p={p}
                  role={role}
                  userName={userName}
                  projects={projects}
                  setProjects={setProjects}
                  addNotification={addNotification}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
