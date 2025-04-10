'use client';

import { useSession } from "next-auth/react";

export default function UserComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>No user is logged in</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
