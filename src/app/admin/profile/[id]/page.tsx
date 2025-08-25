import { notFound } from "next/navigation";

type User = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // langsung object, bukan Promise

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const user: User = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Full Name:</strong> {user.fullname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(user.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
