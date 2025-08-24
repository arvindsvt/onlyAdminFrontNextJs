"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import Modal from "./Modal";

const initialUsers = [
  { id: 1, name: "Alice Johnson", mobile: "9876543210", email: "alice@example.com", created_at: "2025-08-01 10:05", updated_at: "2025-08-20 15:30" },
  { id: 2, name: "Bob Singh",    mobile: "9123456780", email: "bob@example.com",   created_at: "2025-08-05 11:20", updated_at: "2025-08-21 09:45" },
  { id: 3, name: "Chirag K",     mobile: "9988776655", email: "ck@example.com",     created_at: "2025-08-10 08:10", updated_at: "2025-08-22 18:00" },
];

export default function UserTable() {
  const [users, setUsers] = useState(initialUsers);
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const [editing, setEditing] = useState(null); // user object or null
  const [confirmDel, setConfirmDel] = useState(null); // user object or null

  // Sorting
  const sortedUsers = useMemo(() => {
    const arr = [...users];
    arr.sort((a, b) => {
      const key = sort.key;
      const A = (a[key] ?? "").toString().toLowerCase();
      const B = (b[key] ?? "").toString().toLowerCase();
      if (A < B) return sort.dir === "asc" ? -1 : 1;
      if (A > B) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [users, sort]);

  const toggleSort = (key) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  // Add user anchor support
  const addRef = useRef(null);
  useEffect(() => {
    if (window?.location.hash === "#add") {
      addRef.current?.click();
      window.location.hash = "";
    }
  }, []);

  // Handlers
  const handleSave = (form) => {
    if (form.id) {
      setUsers((u) => u.map((x) => (x.id === form.id ? { ...form, updated_at: new Date().toLocaleString() } : x)));
    } else {
      const now = new Date().toLocaleString();
      setUsers((u) => [...u, { ...form, id: Date.now(), created_at: now, updated_at: now }]);
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    setUsers((u) => u.filter((x) => x.id !== id));
    setConfirmDel(null);
  };

  const HeaderCell = ({ label, keyName }) => (
    <th
      className="px-3 py-2 border cursor-pointer select-none text-left"
      onClick={() => toggleSort(keyName)}
      title="Click to sort"
    >
      <div className="flex items-center gap-1">
        <span className="font-medium">{label}</span>
        {sort.key === keyName && <span>{sort.dir === "asc" ? "▲" : "▼"}</span>}
      </div>
    </th>
  );

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex items-center gap-2">
          <button
            ref={addRef}
            className="inline-flex items-center rounded-lg bg-green-600 text-white px-3 py-2 text-sm hover:bg-green-700"
            onClick={() => setEditing({ id: null, name: "", mobile: "", email: "" })}
          >
            + Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <HeaderCell label="Name" keyName="name" />
              <HeaderCell label="Mobile" keyName="mobile" />
              <HeaderCell label="Email" keyName="email" />
              <HeaderCell label="Created At" keyName="created_at" />
              <HeaderCell label="Updated At" keyName="updated_at" />
              <th className="px-3 py-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedUsers.map((u) => (
              <tr key={u.id} className="even:bg-gray-50">
                <td className="px-3 py-2 border">{u.name}</td>
                <td className="px-3 py-2 border">{u.mobile}</td>
                <td className="px-3 py-2 border">{u.email}</td>
                <td className="px-3 py-2 border">{u.created_at}</td>
                <td className="px-3 py-2 border">{u.updated_at}</td>
                <td className="px-3 py-2 border">
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => setEditing(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => setConfirmDel(u)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <EditForm user={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {/* Confirm Delete */}
      {confirmDel && (
        <Modal onClose={() => setConfirmDel(null)}>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Delete User</h2>
            <p>Are you sure you want to delete <span className="font-medium">{confirmDel.name}</span>?</p>
            <div className="flex justify-end gap-2 pt-2">
              <button className="px-3 py-2 rounded border" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={() => handleDelete(confirmDel.id)}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

// Inline EditForm component
function EditForm({ user, onSave, onCancel }) {
  const [form, setForm] = useState({ id: user.id, name: user.name || "", mobile: user.mobile || "", email: user.email || "" });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <h2 className="text-lg font-semibold">{user.id ? "Edit User" : "Add User"}</h2>
      <div className="grid gap-3">
        <label className="text-sm">
          <span className="block mb-1">Name</span>
          <input className="w-full rounded border px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label className="text-sm">
          <span className="block mb-1">Mobile</span>
          <input className="w-full rounded border px-3 py-2" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} required />
        </label>
        <label className="text-sm">
          <span className="block mb-1">Email</span>
          <input type="email" className="w-full rounded border px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="px-3 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white">Save</button>
      </div>
    </form>
  );
}
