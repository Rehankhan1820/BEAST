
"use client";

import { useCallback, useEffect, useState } from "react";
import { getMembers, subscribeMembers } from "../lib/guildMembers";

const STORAGE_KEY = "beast_guild_members";
const UPDATE_EVENT = "guild-members-updated";

export default function useGuildMembers() {
  const [members, setMembers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // REFRESH MEMBERS
  // ==========================================

  const refresh = useCallback(() => {
    try {
      const savedMembers = getMembers();

      setMembers(
        Array.isArray(savedMembers) ? savedMembers : []
      );

      setError("");
    } catch (err) {
      console.error("Failed to load guild members:", err);

      setError("Unable to load guild members.");
    }
  }, []);

  // ==========================================
  // INITIAL LOAD + STORAGE SUBSCRIPTION
  // ==========================================

  useEffect(() => {
    refresh();
    setLoaded(true);

    const unsubscribe = subscribeMembers(refresh);

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [refresh]);

  // ==========================================
  // DELETE MEMBER
  // ==========================================

  const deleteMember = useCallback(
    (memberId) => {
      if (typeof window === "undefined") {
        throw new Error("Deletion is only available in the browser.");
      }

      if (memberId === undefined || memberId === null) {
        throw new Error("Invalid member ID.");
      }

      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (!raw) {
          throw new Error("No saved guild members found.");
        }

        const savedMembers = JSON.parse(raw);

        if (!Array.isArray(savedMembers)) {
          throw new Error("Invalid guild members data.");
        }

        const memberExists = savedMembers.some(
          (member) => String(member.id) === String(memberId)
        );

        if (!memberExists) {
          throw new Error("Member not found in saved guild data.");
        }

        // Delete ONLY the selected member by unique ID
        const updatedMembers = savedMembers.filter(
          (member) => String(member.id) !== String(memberId)
        );

        // Save first. If storage fails, existing data stays untouched.
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedMembers)
        );

        // Immediately update React state
        setMembers(updatedMembers);

        setError("");

        // Notify other components in the same browser tab
        window.dispatchEvent(new Event(UPDATE_EVENT));

        return true;
      } catch (err) {
        console.error("Failed to delete guild member:", err);

        setError(err.message || "Failed to delete member.");

        throw err;
      }
    },
    []
  );

  // ==========================================
  // RETURN HOOK API
  // ==========================================

  return {
    members,
    loaded,
    error,
    refresh,
    deleteMember,
  };
}
