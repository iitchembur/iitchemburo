import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000"; // change if needed

function AuthPage({ isLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/login" : "/signup";
    const body = isLogin ? { email, password } : { name, email, password };

    const res = await fetch(API_BASE + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      if (isLogin) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    } else {
      alert(data.msg || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              className="w-full border px-3 py-2 rounded-xl focus:outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            className="w-full border px-3 py-2 rounded-xl focus:outline-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded-xl focus:outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link to={isLogin ? "/signup" : "/login"} className="text-blue-600 font-semibold">
            {isLogin ? "Sign Up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState(null);

  async function fetchProfile() {
    const token = localStorage.getItem("token");
    const res = await fetch(API_BASE + "/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setUser(data);
    else alert(data.msg || "Unauthorized");
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <button
          onClick={fetchProfile}
          className="bg-green-500 text-white px-4 py-2 rounded-xl mb-4 hover:bg-green-600 transition"
        >
          Load Profile
        </button>

        {user && (
          <div className="mb-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage isLogin={false} />} />
        <Route path="/signup" element={<AuthPage isLogin={false} />} />
        <Route path="/login" element={<AuthPage isLogin={true} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
