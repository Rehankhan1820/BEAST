// lib/guildMembers.js

export const GUILD_NAME = "BT SARKAR";
export const STORAGE_KEY = "beast_guild_members";
export const DEFAULT_AVATAR = "/logo.png"; 


export const LEADER = {
  gameName: "BEAST",
  uid: "519366839",
  guildRole: "Guild Leader",
  guildName: GUILD_NAME,
};
export const MEMBERS_EVENT = "beast:guild-members-updated";


function isBrowser() {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  );
}


export function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}


export function getMembers() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = safeParse(raw, []);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMembers(members) {
  if (!isBrowser()) return { ok: false, error: "storage-unavailable" };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    return { ok: true };
  } catch (err) {
  
    return { ok: false, error: err?.name || "storage-error" };
  }
}

export function uidExists(uid) {
  if (!uid) return false;
  const members = getMembers();
  const normalized = String(uid).trim();
  return members.some((m) => String(m.uid).trim() === normalized);
}

export function generateMemberId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // Safe fallback
  return `m_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export function addMember(memberData) {
  const members = getMembers();

  const member = {
    id: generateMemberId(),
    gameName: memberData.gameName?.trim() || "",
    uid: String(memberData.uid || "").trim(),
    level: Number(memberData.level) || 0,
    guildRole: memberData.guildRole || "Member",
    brRank: memberData.brRank || "",
    csRank: memberData.csRank || "",
    status: memberData.status || "Active",
    joiningDate:
      memberData.joiningDate || new Date().toISOString().slice(0, 10),
    bio: (memberData.bio || "").slice(0, 150),
    avatar: memberData.avatar || "",
    guildName: GUILD_NAME,
    createdAt: new Date().toISOString(),
  };

  // Duplicate UID check
  if (members.some((m) => String(m.uid).trim() === member.uid)) {
    return { ok: false, error: "duplicate-uid" };
  }

  const updated = [...members, member];
  const saved = saveMembers(updated);

  if (!saved.ok) {
    // Agar avatar ki wajah se quota full ho gaya, to bina avatar ke retry karo
    if (member.avatar) {
      const retryMember = { ...member, avatar: "" };
      const retryList = [...members, retryMember];
      const retrySave = saveMembers(retryList);
      if (retrySave.ok) {
        notifyMembersUpdated();
        return { ok: true, member: retryMember, avatarDropped: true };
      }
    }
    return { ok: false, error: saved.error };
  }

  notifyMembersUpdated();

  return { ok: true, member };
}


export function notifyMembersUpdated() {
  if (!isBrowser()) return;
  try {
    window.dispatchEvent(new Event(MEMBERS_EVENT));
  } catch {
 
  }
}


export function subscribeMembers(callback) {
  if (!isBrowser()) return () => {};
  const handler = () => callback();
  window.addEventListener(MEMBERS_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(MEMBERS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}


export const GUILD_ROLES = [
  "Guild Leader",
  "Acting Leader",
  "Officer",
  "Elite Member",
  "Member",
];

export const BR_RANKS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Heroic",
  "Elite Heroic",
  "Master",
  "Grandmaster",
];

export const CS_RANKS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Heroic",
  "Master",
  "Grandmaster",
];

export const MEMBER_STATUSES = ["Active", "Inactive", "On Leave"];