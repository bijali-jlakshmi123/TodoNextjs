import Link from "next/link";

export default function Button() {
  return (
    <Link
      href="/register"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-3"
    >
      Add New User
    </Link>
  );
}
