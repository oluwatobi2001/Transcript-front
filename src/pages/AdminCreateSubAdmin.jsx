import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardTitle } from "../components/ui/card";
 import axios from "axios"; // Uncomment when ready for API calls

const demoSubAdmins = [
	{ name: "Jane Doe", email: "jane@oau.edu.ng" },
	{ name: "John Smith", email: "john@oau.edu.ng" },
	{ name: "Amina Bello", email: "amina@oau.edu.ng" },
];

export default function AdminCreateSubAdmin() {
	const { token } = useSelector((st) => st.user); // Use token for API calls only
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [subAdmins, setSubAdmins] = useState(demoSubAdmins);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		if (!form.name || !form.email || !form.password) {
			setError("All fields are required.");
			return;
		}
		// Demo: Add to local state
		setSubAdmins([...subAdmins, { name: form.name, email: form.email }]);
		setSuccess("Sub-admin created successfully!");
		setForm({ name: "", email: "", password: "" });

		// API call example (uncomment and edit when ready)
		/*
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/create-subadmin", // <-- Replace with your API endpoint
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
        // Optionally add headers for authentication here
      );
      if (response.data && response.data.subAdmin) {
        setSubAdmins([...subAdmins, response.data.subAdmin]);
        setSuccess("Sub-admin created successfully!");
        setForm({ name: "", email: "", password: "" });
      } else {
        setError("Failed to create sub-admin.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "An error occurred while creating sub-admin."
      );
    }
    */
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-50">
			<Card className="w-full max-w-md p-6">
				<CardTitle className="text-center mb-4">Create Sub-Admin</CardTitle>
				<CardContent>
					{error && <div className="text-red-600 mb-2">{error}</div>}
					{success && <div className="text-green-600 mb-2">{success}</div>}
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<Input
							name="name"
							placeholder="Full Name"
							value={form.name}
							onChange={handleChange}
						/>
						<Input
							name="email"
							type="email"
							placeholder="Email"
							value={form.email}
							onChange={handleChange}
						/>
						<Input
							name="password"
							type="password"
							placeholder="Password"
							value={form.password}
							onChange={handleChange}
						/>
						<Button type="submit" className="w-full">
							Create Sub-Admin
						</Button>
					</form>
				</CardContent>
			</Card>
			<div className="mt-8 w-full max-w-md">
				<h2 className="font-bold mb-2">Sub-Admins List</h2>
				<ul className="bg-white rounded shadow p-4">
					{subAdmins.length === 0 && (
						<li className="text-gray-500">No sub-admins yet.</li>
					)}
					{subAdmins.map((admin, idx) => (
						<li key={idx} className="border-b py-2">
							<span className="font-semibold">{admin.name}</span> -{" "}
							{admin.email}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}