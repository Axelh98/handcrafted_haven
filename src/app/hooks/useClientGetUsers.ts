"use client";

import { useEffect, useState } from "react";

export function useClientGetUsers() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("/api/users", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        console.error("Error fetching users:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  return { users, loading, error };
}
