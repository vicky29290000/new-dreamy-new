import React, { useState } from "react";

type Role = "super-admin" | "admin" | "architect" | "structural-team" | "customer";

interface SettingsData {
  profileName: string;
  profileEmail: string;
  password: string;
  preferences: string;
  notifications: string;
}

const Settings: React.FC<{ role: Role }> = ({ role }) => {
  const [settings, setSettings] = useState<SettingsData>({
    profileName: "John Doe",
    profileEmail: "john@example.com",
    password: "********",
    preferences: "Default Preferences",
    notifications: "All Notifications",
  });

  const canEdit = ["super-admin", "admin", "architect"].includes(role);

  const handleChange = (field: keyof SettingsData, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Settings */}
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <p className="font-semibold mb-2">Profile Settings</p>
          {canEdit ? (
            <>
              <input
                className="w-full border p-1 rounded mb-1"
                value={settings.profileName}
                onChange={(e) => handleChange("profileName", e.target.value)}
              />
              <input
                className="w-full border p-1 rounded"
                value={settings.profileEmail}
                onChange={(e) => handleChange("profileEmail", e.target.value)}
              />
            </>
          ) : (
            <>
              <p>{settings.profileName}</p>
              <p className="text-sm text-gray-500">{settings.profileEmail}</p>
            </>
          )}
        </div>

        {/* Account Settings */}
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <p className="font-semibold mb-2">Account Settings</p>
          {canEdit ? (
            <>
              <input
                type="password"
                className="w-full border p-1 rounded mb-1"
                value={settings.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <input
                className="w-full border p-1 rounded"
                value={settings.preferences}
                onChange={(e) => handleChange("preferences", e.target.value)}
              />
            </>
          ) : (
            <>
              <p>{settings.password}</p>
              <p className="text-sm text-gray-500">{settings.preferences}</p>
            </>
          )}
        </div>

        {/* Notification Settings */}
        <div className="p-4 border rounded-lg hover:shadow-md transition">
          <p className="font-semibold mb-2">Notification Settings</p>
          {canEdit ? (
            <input
              className="w-full border p-1 rounded"
              value={settings.notifications}
              onChange={(e) => handleChange("notifications", e.target.value)}
            />
          ) : (
            <p>{settings.notifications}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
