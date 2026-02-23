import { useState, useEffect } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    price: "",
    image: "",
    maxParticipants: "",
  });

  const load = () => getEvents().then((r) => setEvents(r.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      location: "",
      date: "",
      price: "",
      image: "",
      maxParticipants: "",
    });
    setModal("create");
  };

  const openEdit = (e) => {
    setForm({
      title: e.title || "",
      description: e.description || "",
      category: e.category || "",
      location: e.location || "",
      date: e.date ? e.date.slice(0, 16) : "",
      price: e.price ?? "",
      image: e.image || "",
      maxParticipants: e.maxParticipants ?? "",
    });
    setModal({ type: "edit", id: e._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: form.price ? Number(form.price) : undefined,
      maxParticipants: form.maxParticipants ? Number(form.maxParticipants) : undefined,
      date: form.date ? new Date(form.date) : undefined,
    };
    try {
      if (modal === "create") {
        await createEvent(payload);
      } else {
        await updateEvent(modal.id, payload);
      }
      setModal(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      await deleteEvent(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleString("en-US", { dateStyle: "medium" }) : "-";

  if (loading) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Events</h1>
        <button onClick={openCreate} style={styles.addBtn}>
          + Add Event
        </button>
      </div>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev._id}>
                <td style={styles.td}>{ev.title}</td>
                <td style={styles.td}>{ev.location || "-"}</td>
                <td style={styles.td}>{formatDate(ev.date)}</td>
                <td style={styles.td}>{ev.price ?? "-"}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => openEdit(ev)}
                    style={styles.smBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ev._id)}
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
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{modal === "create" ? "Add Event" : "Edit Event"}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                style={styles.input}
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                style={styles.input}
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                style={styles.input}
              />
              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                style={styles.input}
              />
              <input
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                style={styles.input}
              />
              <input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Max participants"
                value={form.maxParticipants}
                onChange={(e) =>
                  setForm((f) => ({ ...f, maxParticipants: e.target.value }))
                }
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
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 700 },
  addBtn: {
    padding: "10px 20px",
    background: "var(--accent)",
    border: "none",
    borderRadius: 8,
    color: "#0f0f12",
    fontWeight: 600,
  },
  tableWrap: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: { textAlign: "left", padding: "14px 16px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)", fontWeight: 500 },
  td: { padding: "14px 16px", borderBottom: "1px solid var(--border)" },
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
    maxWidth: 480,
  },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    padding: "10px 14px",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text)",
  },
  modalActions: { display: "flex", gap: 12, marginTop: 16, justifyContent: "flex-end" },
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
