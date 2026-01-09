"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function DashboardContent() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          {isLoading ? "Loading..." : `Welcome, ${user?.name}!`}
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          {isLoading
            ? "Please wait..."
            : "Your task management dashboard is ready."}
        </p>
      </div>

      {!isLoading && user && (
        <>
          <div className="bg-card border border-border rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Name:</span>{" "}
                {user.name}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span>{" "}
                {user.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">User ID:</span>{" "}
                {user.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-lg font-semibold">Total Tasks</h3>
              <p className="text-3xl font-bold text-primary mt-2">0</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-lg font-semibold">Pending</h3>
              <p className="text-3xl font-bold text-accent mt-2">0</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-lg font-semibold">Completed</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">0</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push("/tasks")}
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Manage Tasks
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
