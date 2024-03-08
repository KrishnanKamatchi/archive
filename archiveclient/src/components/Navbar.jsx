import { useNavigate } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar bg-base-300 rounded-2xl m-auto shadow-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              {<HiMenuAlt1 className="h-5 w-5" />}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
            >
              <li>
                <a onClick={() => navigate("/dashboard")}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => navigate("/favorites")}>Favorites</a>
              </li>
              <li>
                <a onClick={() => navigate("/users")}>Users</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a
            className="btn btn-ghost text-2xl text-orange-500 
          "
          >
            Archiver
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              {<MdLogout className="h-5 w-5" onClick={logout} />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
