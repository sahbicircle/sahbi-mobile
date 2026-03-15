export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateTicket(dateStr) {
  const d = new Date(dateStr);
  const weekday = d.toLocaleString("en-US", { weekday: "long" });
  const monthDay = d.toLocaleString("en-US", { month: "short", day: "numeric" });
  const time = d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return { weekday, monthDay, time };
}

export const calculateProfileCompletion = (user) => {
  if (!user) return 0;

  const fields = [
    "firstName",
    "lastName",
    "email",
    "photoUrl",
    "gender",
    "relationshipStatus",
    "city",
    "language",
    "interests",
    "phoneNumber",
    "birthday",
  ];

  // Count filled fields
  let filled = 0;
  fields.forEach((field) => {
    let value = user[field];
    if (field === "photoUrl") {
      value = Array.isArray(value) ? value : value ? [value] : [];
      value = value.length > 0 ? value : null;
    }
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      filled++;
    }
  });

  // Include nested 'personality' fields
  const personalityFields = [
    "firstImpression",
    "selfView",
    "planningStyle",
    "rechargeStyle",
    "socialPreference",
    "socialPace",
    "conversationStart",
    "talkStyle",
    "favoriteTopics",
    "dinnerStyle",
    "superpower",
  ];

  if (user.personality) {
    personalityFields.forEach((pf) => {
      const val = user.personality[pf];
      if (
        val !== undefined &&
        val !== null &&
        val !== "" &&
        (!Array.isArray(val) || val.length > 0)
      ) {
        filled++;
      }
    });
  }

  const totalFields = fields.length + personalityFields.length;

  return Math.round((filled / totalFields) * 100); // returns percentage
};
