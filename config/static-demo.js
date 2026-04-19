import Constants from "expo-constants";

/**
 * Static chats + notifications for demos (no backend).
 *
 * Disable live API override: EXPO_PUBLIC_STATIC_DEMO=false
 * Force on: EXPO_PUBLIC_STATIC_DEMO=true
 *
 * `expo.extra.staticDemo` in app.json is read from Constants when the runtime
 * exposes it (native builds). Many dev clients / web leave `expoConfig` null or
 * omit `extra` — then we still enable demo data unless you set the env to false.
 */
function readStaticDemoFromConstants() {
  try {
    const C = Constants;
    if (!C) return undefined;
    const a = C.expoConfig?.extra?.staticDemo;
    if (typeof a === "boolean") return a;
    const b = C.manifest?.extra?.staticDemo;
    if (typeof b === "boolean") return b;
    const m2 = C.manifest2;
    if (m2?.extra && typeof m2.extra === "object") {
      const ex = m2.extra;
      if (typeof ex.expoClient?.extra?.staticDemo === "boolean") {
        return ex.expoClient.extra.staticDemo;
      }
      if (typeof ex.staticDemo === "boolean") return ex.staticDemo;
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

export function isStaticDemo() {
  const env = process.env.EXPO_PUBLIC_STATIC_DEMO;
  if (env === "false" || env === "0") return false;
  if (env === "true" || env === "1") return true;

  const fromConstants = readStaticDemoFromConstants();
  if (fromConstants === false) return false;
  if (fromConstants === true) return true;

  // app.json sets staticDemo, but extra often missing in Metro/web → show demo anyway
  return true;
}
