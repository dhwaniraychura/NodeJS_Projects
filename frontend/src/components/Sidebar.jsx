function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "260px", minHeight: "100vh" }}
    >
      <h3 className="mb-4 text-center">Smart Society</h3>

      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <a href="/admin" className="nav-link text-white">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </a>
        </li>

        <li className="nav-item mb-3">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-people me-2"></i>
            Residents
          </a>
        </li>

        <li className="nav-item mb-3">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-exclamation-circle me-2"></i>
            Complaints
          </a>
        </li>

        <li className="nav-item mb-3">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-person-badge me-2"></i>
            Visitors
          </a>
        </li>

        <li className="nav-item mb-3">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-receipt me-2"></i>
            Bills
          </a>
        </li>
        <li>
            <Link to="/residents">Residents</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;