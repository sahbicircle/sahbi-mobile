import { useState, useEffect } from "react";
import { getChats, getChat, deleteChat } from "../api";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () =>
    getChats()
      .then((r) => setChats(r.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openChat = async (id) => {
    try {
      const { data } = await getChat(id);
      setSelected(data);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this chat?")) return;
    try {
      await deleteChat(id);
      setSelected(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const chatTitle = (c) => {
    if (c.type === "event" && c.event) return c.event.title || "Event chat";
    if (c.participants?.length) {
      const names = c.participants
        .map((p) => [p.firstName, p.lastName].filter(Boolean).join(" "))
        .filter(Boolean);
      return names.join(", ") || "Private chat";
    }
    return "Chat";
  };

  if (loading) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.list}>
        <h1 style={styles.title}>Chats</h1>
        {chats.map((c) => (
          <div
            key={c._id}
            onClick={() => openChat(c._id)}
            style={{
              ...styles.chatItem,
              ...(selected?._id === c._id ? styles.chatItemActive : {}),
            }}
          >
            <span style={styles.chatType}>{c.type}</span>
            <span>{chatTitle(c)}</span>
            <span style={styles.chatMeta}>
              {c.participants?.length || 0} participants
            </span>
          </div>
        ))}
      </div>
      <div style={styles.detail}>
        {selected ? (
          <>
            <div style={styles.detailHeader}>
              <h2>{chatTitle(selected)}</h2>
              <button
                onClick={() => handleDelete(selected._id)}
                style={styles.deleteBtn}
              >
                Delete chat
              </button>
            </div>
            <div style={styles.participants}>
              <strong>Participants:</strong>{" "}
              {selected.participants
                ?.map((p) =>
                  [p.firstName, p.lastName].filter(Boolean).join(" ")
                )
                .filter(Boolean)
                .join(", ") || "-"}
            </div>
            <div style={styles.messages}>
              <strong>Messages ({selected.messages?.length || 0})</strong>
              {(selected.messages || []).map((m, i) => (
                <div key={i} style={styles.msg}>
                  <span style={styles.msgSender}>
                    {m.sender
                      ? [m.sender.firstName, m.sender.lastName]
                          .filter(Boolean)
                          .join(" ")
                      : "Unknown"}
                    :
                  </span>{" "}
                  {m.message}
                  <span style={styles.msgTime}>
                    {m.timestamp
                      ? new Date(m.timestamp).toLocaleString()
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={styles.placeholder}>Select a chat to view details</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", gap: 24, minHeight: 400 },
  list: {
    width: 320,
    flexShrink: 0,
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
    maxHeight: 500,
    overflowY: "auto",
  },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
  chatItem: {
    padding: "12px 14px",
    borderRadius: 8,
    marginBottom: 6,
    cursor: "pointer",
    border: "1px solid transparent",
  },
  chatItemActive: {
    background: "var(--bg-hover)",
    borderColor: "var(--accent)",
  },
  chatType: {
    display: "block",
    fontSize: 11,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  chatMeta: {
    display: "block",
    fontSize: 12,
    color: "var(--text-muted)",
    marginTop: 4,
  },
  detail: {
    flex: 1,
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 24,
    overflowY: "auto",
  },
  detailHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  deleteBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid var(--danger)",
    borderRadius: 6,
    color: "var(--danger)",
    fontSize: 14,
  },
  participants: { marginBottom: 20, color: "var(--text-muted)" },
  messages: {},
  msg: {
    padding: "10px 14px",
    background: "var(--bg)",
    borderRadius: 8,
    marginBottom: 8,
    borderLeft: "3px solid var(--accent)",
  },
  msgSender: { fontWeight: 600, marginRight: 6 },
  msgTime: {
    display: "block",
    fontSize: 12,
    color: "var(--text-muted)",
    marginTop: 4,
  },
  placeholder: { color: "var(--text-muted)" },
};
