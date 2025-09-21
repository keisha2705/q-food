import React, { useState, useEffect, useRef } from "react";

// Accent color options
const ACCENT_COLORS = [
  { name: "Blue", value: "blue-500" },
  { name: "Orange", value: "orange-500" },
  { name: "Green", value: "green-500" },
  { name: "Purple", value: "purple-500" },
];

const FONT_SIZES = [
  { label: "Small", value: "text-sm" },
  { label: "Medium", value: "text-base" },
  { label: "Large", value: "text-lg" },
];

const defaultSettings = {
  darkMode: false,
  accentColor: "blue-500",
  displayName: "",
  profilePic: "",
  role: "customer",
  fontSize: "text-base",
  highContrast: false,
};

function getInitialSettings() {
  const saved = localStorage.getItem("userSettings");
  return saved ? JSON.parse(saved) : defaultSettings;
}

function Settings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(getInitialSettings());
  const fileInputRef = useRef();

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  // Apply dark mode and font size to body
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.body.classList.remove("text-sm", "text-base", "text-lg");
    document.body.classList.add(settings.fontSize);
    if (settings.highContrast) {
      document.body.classList.add("contrast-more");
    } else {
      document.body.classList.remove("contrast-more");
    }
  }, [settings.darkMode, settings.fontSize, settings.highContrast]);

  // Only allow logged-in users to open settings
  const isAuthenticated = !!localStorage.getItem("username");

  // Handle profile pic upload
  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSettings((s) => ({ ...s, profilePic: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Save changes (mock)
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved settings:", settings);
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (!e.target.closest("#settings-modal") && !e.target.closest("#profile-icon")) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Profile/User Icon */}
      <button
        id="profile-icon"
        className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg w-12 h-12 flex items-center justify-center hover:ring-2 ring-blue-400 transition"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open settings"
      >
        {settings.profilePic ? (
          <img
            src={settings.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <svg className="w-7 h-7 text-gray-600 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
          </svg>
        )}
      </button>

      {/* Settings Modal/Dropdown */}
      {open && (
        <div
          id="settings-modal"
          className="fixed top-20 right-4 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl w-80 max-w-full p-5 animate-fade-in"
        >
          <form onSubmit={handleSave} className="space-y-6">
            {/* General Settings */}
            <div>
              <h2 className="font-bold text-lg mb-2 text-blue-500 dark:text-blue-300">General Settings</h2>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Dark Mode</label>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings.darkMode}
                  onChange={() => setSettings((s) => ({ ...s, darkMode: !s.darkMode }))}
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Accent Color</label>
                <select
                  className="ml-2 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-800"
                  value={settings.accentColor}
                  onChange={(e) => setSettings((s) => ({ ...s, accentColor: e.target.value }))}
                >
                  {ACCENT_COLORS.map((c) => (
                    <option key={c.value} value={c.value}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mb-2">
                <label className="font-medium w-28">Display Name</label>
                <input
                  className="flex-1 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-800"
                  value={settings.displayName}
                  onChange={(e) => setSettings((s) => ({ ...s, displayName: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="font-medium w-28">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="flex-1"
                  ref={fileInputRef}
                  onChange={handleProfilePic}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <h2 className="font-bold text-lg mb-2 text-blue-500 dark:text-blue-300">Role</h2>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="restaurant"
                    checked={settings.role === "restaurant"}
                    onChange={() => setSettings((s) => ({ ...s, role: "restaurant" }))}
                  />
                  Restaurant
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={settings.role === "customer"}
                    onChange={() => setSettings((s) => ({ ...s, role: "customer" }))}
                  />
                  Customer
                </label>
              </div>
            </div>

            {/* Accessibility */}
            <div>
              <h2 className="font-bold text-lg mb-2 text-blue-500 dark:text-blue-300">Accessibility</h2>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Font Size</label>
                <select
                  className="ml-2 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-800"
                  value={settings.fontSize}
                  onChange={(e) => setSettings((s) => ({ ...s, fontSize: e.target.value }))}
                >
                  {FONT_SIZES.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">High Contrast</label>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings.highContrast}
                  onChange={() => setSettings((s) => ({ ...s, highContrast: !s.highContrast }))}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Settings;