import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardTitle } from "../components/ui/card";
 import axios from "axios"; // Uncomment when ready for API calls
 import {userRole} from '../Sessions';
 import Select from 'react-select';


const demoSubAdmins = [
	{ name: "Jane Doe", email: "jane@oau.edu.ng" },
	{ name: "John Smith", email: "john@oau.edu.ng" },
	{ name: "Amina Bello", email: "amina@oau.edu.ng" },
];

export default function AdminCreateSubAdmin() {
	const { token } = useSelector((st) => st.user); // Use token for API calls only
	const [form, setForm] = useState({ Fname: "",  Lname: "",  Uname: "", email: "", password: "" , userRole: ""});
	const [subAdmins, setSubAdmins] = useState(demoSubAdmins);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
const [selectedUserRole, setSelectedUserRole] = useState(null)
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleUserRoleChange =(selected) => {
		setSelectedUserRole(selected?.value);
		setForm({...form, userRole: selected.value})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form)
		setError("");
		setSuccess("");
		if (!form.Fname || !form.Uname ||!form.Lname || !form.email || !form.password  || !form.userRole ) {
			setError("All fields are required.");
			return;
		}
		
		

		// API call example (uncomment and edit when ready)
		
    try {
		const url = `${import.meta.env.VITE_PUBLIC_BASE_API_URL}/api/auth/register`
      const response = await axios.post(
        url, // <-- Replace with your API endpoint
        {
          firstName: form.Fname,
		  lastName: form.Lname,
		  userName: form.Uname,
          userEmail: form.email,
          userPassword: form.password,
		  userRole: form.userRole.value
        }
        // Optionally add headers for authentication here
      );
      if (response.data) {
        
        setSuccess("Sub-admin created successfully!");
        setForm({ Fname: "", email: "", password: "" });
      } else {
        setError("Failed to create admin.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "An error occurred while creating sub-admin."
      );
    }
    
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
							name="Fname"
							placeholder="First Name"
							value={form.Fname}
							onChange={handleChange}
						/>
						<Input
							name="Lname"
							placeholder="Last Name"
							value={form.Lname}
							onChange={handleChange}
						/>
						<Input
							name="Uname"
							placeholder="User Name"
							value={form.Uname}
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
						<Select 
						 options={userRole}
						 value={form.userRole?.value}
						 onChange={handleUserRoleChange}
						 placeholder='Select Role'
						
						/>
						<Button type="submit" className="w-full">
							Create Sub-Admin
						</Button>
					</form>
				</CardContent>
			</Card>
			
		</div>
	);
}