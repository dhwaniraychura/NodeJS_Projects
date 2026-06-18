import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-4">
      <span className="navbar-brand mb-0 h1">
        Smart Society Management
      </span>

      <button
        className="btn btn-light"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;