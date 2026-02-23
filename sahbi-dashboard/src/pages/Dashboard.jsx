import { useState, useEffect } from "react";
import { getUsers, getEvents, getBookings, getChats } from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    bookings: 0,
    chats: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUsers(), getEvents(), getBookings(), getChats()])
      .then(([u, e, b, c]) => {
        setStats({
          users: u.data?.length ?? 0,
          events: e.data?.length ?? 0,
          bookings: b.data?.length ?? 0,
          chats: c.data?.length ?? 0,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;
  }

  const cards = [
    { label: "Users", value: stats.users, color: "#eba28a" },
    { label: "Events", value: stats.events, color: "#a78bfa" },
    { label: "Bookings", value: stats.bookings, color: "#34d399" },
    { label: "Chats", value: stats.chats, color: "#f472b6" },
  ];

  return (
    <div>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.subtitle}>Overview of your platform</p>
      <div style={styles.grid}>
        {cards.map((card) => (
          <div key={card.label} style={styles.card}>
            <span style={{ ...styles.cardValue, color: card.color }}>
              {card.value}
            </span>
            <span style={styles.cardLabel}>{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8 },
  subtitle: { color: "var(--text-muted)", marginBottom: 32 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 20,
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 24,
  },
  cardValue: { fontSize: 36, fontWeight: 700, display: "block" },
  cardLabel: { color: "var(--text-muted)", fontSize: 14, marginTop: 4 },
};
