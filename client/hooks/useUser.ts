"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    
    // Only fetch user if there's a token
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
        // Update localStorage with latest user data
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch user");
        // Clear auth if unauthorized
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
}
