"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Calendar as CalendarIcon,
  MessageSquare,
  Settings as SettingsIcon, // ✅ rename icon here
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Projects, { Project } from "./Projects";
import Team from "./Team"; // ✅ Added import
import Documents from "./Documents";
import Calendar from "./Calendar"; // Make sure this is a default expor
import Messages from "./Messages"
import Settings from "./Settings"; // default export
import { useEffect } from "react";

const Overview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<{
    name: string;
    role: string;
    avatar: string;
  } | null>(null);

  // Shared projects state
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Modern Villa Design", client: "John Smith", status: "In Progress", progress: 75, assignedRoles: ["Architect"] },
    { id: 2, name: "Commercial Office Space", client: "Tech Solutions Inc", status: "Review", progress: 90, assignedRoles: ["Architect", "Admin"] },
    { id: 3, name: "Luxury Apartment Renovation", client: "Sarah Johnson", status: "Planning", progress: 30, assignedRoles: ["Customer"] },
    { id: 4, name: "Retail Store Design", client: "Fashion Outlet", status: "Completed", progress: 100, assignedRoles: ["Structural"] },
  ]);
const [teamMembers, setTeamMembers] = useState(() => {
  const saved = localStorage.getItem("teamMembers");
  return saved ? JSON.parse(saved) : [
    { name: "Alex Morgan", role: "Admin", avatar: "/placeholder.svg" },
    { name: "Sarah Johnson", role: "Customer", avatar: "/placeholder.svg" },
    { name: "Emma Stone", role: "Architect", avatar: "/placeholder.svg" },
  ];
});
useEffect(() => {
  localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
}, [teamMembers]);

  const [meetings, setMeetings] = useState<{ id: number; title: string; assignedTo: string[]; date: string }[]>([]);

  const [documents, setDocuments] = useState<{ id: number; name: string; uploadedBy: string }[]>([]);

  

  // Notifications state
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev]);
  };
// Team helpers
  const addTeamMember = (member: { name: string; role: string; avatar: string }) => {
    setTeamMembers(prev => [...prev, member]);
    addNotification(`${member.name} added to the team.`);
  };

  const removeTeamMember = (name: string) => {
    setTeamMembers(prev => prev.filter(m => m.name !== name));
    addNotification(`${name} removed from the team.`);
  };

  const updateTeamMember = (name: string, updated: Partial<{ name: string; role: string; avatar: string }>) => {
    setTeamMembers(prev =>
      prev.map(m => (m.name === name ? { ...m, ...updated } : m))
    );
    addNotification(`${name}'s details updated.`);
  };

  // Meeting helpers
  const addMeeting = (meeting: { id: number; title: string; assignedTo: string[]; date: string }) => {
    setMeetings(prev => [...prev, meeting]);
    addNotification(`Meeting "${meeting.title}" scheduled.`);
  };

  const updateMeeting = (id: number, updated: Partial<{ title: string; assignedTo: string[]; date: string }>) => {
    setMeetings(prev =>
      prev.map(m => (m.id === id ? { ...m, ...updated } : m))
    );
    addNotification(`Meeting updated.`);
  };

  const removeMeeting = (id: number) => {
    setMeetings(prev => prev.filter(m => m.id !== id));
    addNotification(`Meeting removed.`);
  };

  // Document helpers
  const uploadDocument = (doc: { id: number; name: string; uploadedBy: string }) => {
    setDocuments(prev => [...prev, doc]);
    addNotification(`Document "${doc.name}" uploaded by ${doc.uploadedBy}.`);
  };

  // Message helpers
  const [selectedTo, setSelectedTo] = useState(""); // who to send message to
  const [messageContent, setMessageContent] = useState(""); // message text
  const [messages, setMessages] = useState<{ id: number; from: string; to: string; content: string; date: string }[]>([]);

  const sendMessage = (from: string, to: string, content: string) => {
  if (!to || !content) return; // simple validation
  const newMsg = { id: Date.now(), from, to, content, date: new Date().toISOString() };
  setMessages(prev => [...prev, newMsg]);
  addNotification(`Message sent by ${from} to ${to}.`);
};

  const login = (role: string) => {
    setUser({
      name: role === "Customer" ? "Sarah Johnson" : "Alex Morgan",
      role,
      avatar: "/placeholder.svg",
    });
    setActiveTab("overview");
  };

  const logout = () => setUser(null);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Please log in</h1>
        <div className="space-x-2">
          {["Super Admin", "Admin", "Architect", "Customer", "Structural"].map((role) => (
            <Button key={role} onClick={() => login(role)}>
              Login as {role}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Sidebar items filtered by role
  const allSidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, roles: ["Super Admin", "Admin", "Architect", "Customer", "Structural"] },
    { id: "projects", label: "Projects", icon: Building2, roles: ["Super Admin", "Admin", "Architect", "Customer", "Structural"] },
    { id: "team", label: "Team", icon: Users, roles: ["Super Admin", "Admin", "Architect"] },
    { id: "documents", label: "Documents", icon: FileText, roles: ["Super Admin", "Admin"] },
    { id: "calendar", label: "Calendar", icon: CalendarIcon, roles: ["Super Admin", "Admin", "Architect"] },
    { id: "messages", label: "Messages", icon: MessageSquare, roles: ["Super Admin", "Admin", "Architect", "Customer"] },
    { id: "settings", label: "Settings", icon: SettingsIcon, roles: ["Super Admin", "Admin"] },  // ✅ Use icon here
];
  const sidebarItems = allSidebarItems.filter((item) => item.roles.includes(user.role));

  // Stats filtered by role
  const allStats = [
    { title: "Active Projects", value: projects.length.toString(), change: "+2 this month", icon: Building2, roles: ["Super Admin", "Admin", "Architect", "Customer"] },
    { title: "Pending Approvals", value: "5", change: "3 requiring attention", icon: FileText, roles: ["Super Admin", "Admin"] },
    { title: "Team Members", value: "24", change: "2 new hires", icon: Users, roles: ["Super Admin", "Admin", "Architect"] },
    { title: "Upcoming Meetings", value: "7", change: "This week", icon: CalendarIcon, roles: ["Super Admin", "Architect"] },
    { title: "Assigned Tasks", value: "8", change: "2 new tasks", icon: FileText, roles: ["Structural"] },
  ];
  const stats = allStats.filter((stat) => stat.roles.includes(user.role));

  // Recent projects visible to user
  const recentProjects = projects.filter((project) => {
    if (user.role === "Super Admin") return true;
    if (user.role === "Customer") return project.client === user.name;
    return project.assignedRoles.includes(user.role);
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="bg-red-500 w-8 h-8 rounded-md flex items-center justify-center">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="ml-2 text-xl font-bold">Quad Plus</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${activeTab === item.id ? "bg-red-50 text-red-500" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">{activeTab === "overview" ? "Overview" : "Projects"}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input type="text" placeholder="Search..." className="pl-8 pr-4 py-2 border rounded-md text-sm w-40 md:w-64" />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline">{user.name}</span>
              <Badge className="bg-red-500">{user.role}</Badge>
            </div>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "overview" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Welcome back, {user.name}</h2>
                <p className="text-gray-500 mt-1">Here's a summary of your projects and stats</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{stat.title}</h3>
                        <p className="text-gray-500">{stat.change}</p>
                      </div>
                      <stat.icon className="w-6 h-6 text-gray-500" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-2">Recent Projects</h3>
                {recentProjects.length === 0 ? (
                  <p className="text-gray-500">No projects to display.</p>
                ) : (
                  <div className="space-y-2">
                    {recentProjects.map((p) => (
                      <Card key={p.id} className="p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{p.name}</h4>
                            <p className="text-sm text-gray-500">{p.client}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={p.status === "Completed" ? "default" : "secondary"}>
                              {p.status}
                            </Badge>
                            <div className="text-sm text-gray-500 mt-1">{p.progress}%</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "projects" && (
            <Projects
              role={user.role}
              userName={user.name}
              projects={projects}
              setProjects={setProjects}
              addNotification={addNotification} // Pass notification function
            />
          )}
           {activeTab === "team" && (
            <Team
              role={user.role.toLowerCase().replace(" ", "-") as any}
              userName={user.name}
              teamMembers={teamMembers}
              addTeamMember={addTeamMember}
              removeTeamMember={removeTeamMember}
              updateTeamMember={updateTeamMember}
              addNotification={addNotification}
            />
          )}
          {activeTab === "documents" && (
            <Documents
              role={user.role.toLowerCase().replace(" ", "-") as any}
              documents={documents}
              uploadDocument={uploadDocument}
              addNotification={addNotification}
            />
          )}
           {activeTab === "calendar" && (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Meetings</h2>

    {/* Assign Meeting (only for certain roles) */}
{["Super Admin", "Admin", "Architect"].includes(user.role) && (
  <div className="flex items-center space-x-2">
    <input
      type="text"
      placeholder="Meeting title"
      className="border rounded-md px-2 py-1 flex-1"
      id="meetingTitle"
    />

    <input
      type="date"
      className="border rounded-md px-2 py-1"
      id="meetingDate"
    />

    <select
      multiple
      className="border rounded-md px-2 py-1"
      id="meetingUsers"
    >
      {teamMembers.map((member) => (
        <option key={member.name} value={member.name}>
          {member.name} ({member.role})
        </option>
      ))}
    </select>

    <Button
      onClick={() => {
        const title = (document.getElementById("meetingTitle") as HTMLInputElement)?.value;
        const date = (document.getElementById("meetingDate") as HTMLInputElement)?.value;
        const assigned = Array.from(
          (document.getElementById("meetingUsers") as HTMLSelectElement)?.selectedOptions || []
        ).map((opt) => opt.value);

        if (!title || !date || assigned.length === 0) {
          addNotification("Please fill all meeting details.");
          return;
        }

        addMeeting({
          id: Date.now(),
          title,
          assignedTo: assigned,
          date,
        });

        (document.getElementById("meetingTitle") as HTMLInputElement).value = "";
        (document.getElementById("meetingDate") as HTMLInputElement).value = "";
        (document.getElementById("meetingUsers") as HTMLSelectElement).selectedIndex = -1;
      }}
    >
      Assign Meeting
    </Button>
  </div>
)}

    {/* Meetings List */}
    <div className="mt-4 space-y-2">
      {meetings.length === 0 ? (
        <p className="text-gray-500">No meetings scheduled yet.</p>
      ) : (
        meetings.map((m) => (
          <div
            key={m.id}
            className="p-2 border rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{m.title}</p>
              <p className="text-sm text-gray-500">
                Assigned to: {m.assignedTo.join(", ")} | Date: {m.date}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeMeeting(m.id)}
            >
              Remove
            </Button>
          </div>
        ))
      )}
    </div>
  </div>
)}

 {activeTab === "messages" && (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <select
        value={selectedTo}
        onChange={(e) => setSelectedTo(e.target.value)}
        className="border rounded-md px-2 py-1"
      >
        <option value="">Select user</option>
        {teamMembers.map((member) => (
          <option key={member.name} value={member.name}>
            {member.name} ({member.role})
          </option>
        ))}
      </select>

      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type your message..."
        className="border rounded-md px-2 py-1 flex-1"
      />

      <Button
        onClick={() => {
          sendMessage(user.name, selectedTo, messageContent);
          setMessageContent(""); // clear input after sending
        }}
      >
        Send
      </Button>
    </div>

    {/* Messages List */}
    <div className="mt-4 space-y-2">
      {messages.map((msg) => (
        <div key={msg.id} className="p-2 border rounded-md">
          <strong>{msg.from}</strong> to <strong>{msg.to}</strong>: {msg.content}
        </div>
      ))}
    </div>
  </div>
)}
 {activeTab === "settings" && (
            <Settings
              role={user.role.toLowerCase().replace(" ", "-") as any}
              user={user}
              setUser={setUser}
              addNotification={addNotification}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Overview;
