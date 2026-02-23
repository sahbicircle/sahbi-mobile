import { useState, useEffect } from "react";
import { getBookings, updateBooking, deleteBooking } from "../api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    getBookings()
      .then((r) => setBookings(r.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateBooking(id, { status });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await deleteBooking(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const userName = (b) => {
    const u = b.user;
    if (!u) return "-";
    return [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email || "-";
  };

  const eventTitle = (b) => b.event?.title || "-";

  if (loading) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;

  return (
    <div>
      <h1 style={styles.title}>Bookings</h1>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Event</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{userName(b)}</td>
                <td>{eventTitle(b)}</td>
                <td>
                  <select
                    value={b.status || "pending"}
                    onChange={(e) => handleStatusChange(b._id, e.target.value)}
                    style={styles.select}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{b.paymentStatus || "unpaid"}</td>
                <td>
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleString()
                    : "-"}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(b._id)}
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
    fontSize: 14,
  },
};
