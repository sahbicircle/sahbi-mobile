import { useState, useEffect } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
  setUserRole,
} from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", city: "" });

  const load = () =>
    getUsers()
      .then((r) => setUsers(r.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openEdit = (u) => {
    setForm({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      city: u.city || "",
    });
    setModal({ type: "edit", id: u._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(modal.id, form);
      setModal(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await setUserRole(id, role);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  if (loading) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;

  return (
    <div>
      <h1 style={styles.title}>Users</h1>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{[u.firstName, u.lastName].filter(Boolean).join(" ") || "-"}</td>
                <td>{u.email}</td>
                <td>{u.city || "-"}</td>
                <td>
                  <select
                    value={u.role || "user"}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    style={styles.select}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button onClick={() => openEdit(u)} style={styles.smBtn}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    style={{ ...styles.smBtn, color: "var(--danger)" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={styles.overlay} onClick={() => setModal(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                style={styles.input}
              />
              <input
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                style={styles.input}
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                style={styles.input}
              />
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setModal(null)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" style={styles.submitBtn}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  title: { fontSize: 28, fontWeight: 700, marginBottom: 24 },
  tableWrap: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    borderBottom: "1px solid var(--border)",
    color: "var(--text-muted)",
    fontWeight: 500,
  },
  td: { padding: "14px 16px", borderBottom: "1px solid var(--border)" },
  select: {
    padding: "6px 10px",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 6,
    color: "var(--text)",
  },
  smBtn: {
    background: "none",
    border: "none",
    color: "var(--accent)",
    marginRight: 12,
    fontSize: 14,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 420,
  },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    padding: "10px 14px",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text)",
  },
  modalActions: {
    display: "flex",
    gap: 12,
    marginTop: 16,
    justifyContent: "flex-end",
  },
  cancelBtn: {
    padding: "10px 20px",
    background: "transparent",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text-muted)",
  },
  submitBtn: {
    padding: "10px 20px",
    background: "var(--accent)",
    border: "none",
    borderRadius: 8,
    color: "#0f0f12",
    fontWeight: 600,
  },
};
