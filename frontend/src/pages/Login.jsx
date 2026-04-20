import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axiosConfig";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    role: "MEMBER", // Default role
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear errors on typing
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isRegistering ? "/auth/register" : "/auth/login";
      
      // If logging in, only send email and password
      const payload = isRegistering 
        ? formData 
        : { email: formData.email, password: formData.password };

      const response = await API.post(endpoint, payload);

      // Save user to context & localStorage
      login(response.data);

      // Redirect based on role
      const userRole = response.data.role;
      if (userRole === "ADMIN") navigate("/admin");
      else if (userRole === "SPACE_MANAGER") navigate("/manager");
      else navigate("/dashboard"); 

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Something went wrong. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">
          {isRegistering ? "Register" : "Login"}
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        {isRegistering && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="MEMBER">Member</option>
              <option value="SPACE_MANAGER">Space Manager</option>
              <option value="ADMIN">Admin</option>
            </select>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password (Min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button 
          disabled={loading}
          className={`w-full text-white p-2 rounded transition-colors ${
            isRegistering 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-blue-500 hover:bg-blue-600"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Processing..." : (isRegistering ? "Register" : "Login")}
        </button>

        <p className="text-sm text-center mt-4">
          {isRegistering ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-500 font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            {isRegistering ? "Login here" : "Register here"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;