import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/events", label: "Events" },
  { to: "/users", label: "Users" },
  { to: "/bookings", label: "Bookings" },
  { to: "/chats", label: "Chats" },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>Sahbi</div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {}),
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={styles.footer}>
          <span style={styles.userEmail}>{user?.email}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: 260,
    background: "var(--bg-card)",
    borderRight: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    padding: 24,
    fontSize: 22,
    fontWeight: 700,
    color: "var(--accent)",
  },
  nav: {
    flex: 1,
    padding: "0 12px",
  },
  navLink: {
    display: "block",
    padding: "12px 16px",
    borderRadius: 8,
    color: "var(--text-muted)",
    marginBottom: 4,
    transition: "all 0.15s",
  },
  navLinkActive: {
    background: "var(--bg-hover)",
    color: "var(--accent)",
    fontWeight: 500,
  },
  footer: {
    padding: 20,
    borderTop: "1px solid var(--border)",
  },
  userEmail: {
    display: "block",
    fontSize: 12,
    color: "var(--text-muted)",
    marginBottom: 8,
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid var(--border)",
    borderRadius: 6,
    color: "var(--text-muted)",
    fontSize: 14,
  },
  main: {
    flex: 1,
    padding: 32,
    overflow: "auto",
  },
};
