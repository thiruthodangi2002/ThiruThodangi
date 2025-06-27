import React, { useState } from "react";
import {
  uploadImageToGitHub,
  deleteFileFromGitHub,
  updateGalleryJSON,
  getGalleryFiles
} from "./utils/githubApi";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

function AdminPanel() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [deleteName, setDeleteName] = useState("");

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const handleLogin = async () => {
    try {
      setStatus("Logging in...");
      await signInWithEmailAndPassword(auth, email, pass);
      setAuthed(true);
      setStatus("");
    } catch (err) {
      setStatus("❌ Invalid email or password");
    }
  };

  const handleReset = async () => {
    if (!email) return alert("Enter your email to reset password.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📨 Password reset email sent.");
    } catch (err) {
      alert("Failed to send reset email. Try again.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const path = `gallery/${file.name}`;
    setStatus("Uploading...");
    try {
      await uploadImageToGitHub(file, path, token);
      const updatedFiles = await getGalleryFiles(token);
      await updateGalleryJSON(updatedFiles, token);
      setStatus("✅ Upload successful");
    } catch {
      setStatus("❌ Upload failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteName) return;
    const path = `gallery/${deleteName}`;
    const confirmed = window.confirm(`Are you sure to delete ${path}?`);
    if (!confirmed) return;

    try {
      await deleteFileFromGitHub(path, token);
      const updatedFiles = await getGalleryFiles(token);
      await updateGalleryJSON(updatedFiles, token);
      setStatus("✅ Deleted successfully");
    } catch {
      setStatus("❌ Delete failed");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 px-4 py-2 border rounded"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <div className="text-right mb-3">
            <button className="text-sm text-blue-600" onClick={handleReset}>
              Forgot Password?
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Login
          </button>
          {status && <p className="text-sm text-center mt-3 text-gray-600">{status}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload New Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Upload
      </button>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-bold mb-2">Delete Image</h2>
        <input
          type="text"
          placeholder="Filename (e.g., long01.jpg)"
          className="w-full px-4 py-2 border rounded mb-2"
          value={deleteName}
          onChange={(e) => setDeleteName(e.target.value)}
        />
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </div>
  );
}

export default AdminPanel;
