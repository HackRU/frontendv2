"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SetUser } from '@/app/lib/actions';

interface UpdateUserModalProps {
  isOpen: boolean;
  user: any;
  onClose: () => void;
  onUpdated: () => void;
}

export default function UpdateUserModal({
  isOpen,
  user = {},
  onClose,
  onUpdated,
}: UpdateUserModalProps) {
 

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    github: user?.github || '',
    major: user?.major || '',
    school: user?.school || '',
    grad_year: user?.grad_year || '',
    shirt_size: user?.shirt_size || '',
    short_answer: user?.short_answer || '',    
    dietary_restrictions: user?.dietary_restrictions || '',
    special_needs: user?.special_needs || '',
    date_of_birth: user?.date_of_birth || '',
    gender: user?.gender || '',
    registration_status: user?.registration_status || '',
    level_of_study: user?.level_of_study || '',
    ethnicity: user?.ethnicity || '',
    hackathon_count: user?.hackathon_count || '',
    phone_number: user?.phone_number || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      github: user?.github || '',
      major: user?.major || '',
      school: user?.school || '',
      grad_year: user?.grad_year || '',
      shirt_size: user?.shirt_size || '',
      short_answer: user?.short_answer || '',    
      dietary_restrictions: user?.dietary_restrictions || '',
      special_needs: user?.special_needs || '',
      date_of_birth: user?.date_of_birth || '',
      gender: user?.gender || '',
      registration_status: user?.registration_status || '',
      level_of_study: user?.level_of_study || '',
      ethnicity: user?.ethnicity || '',
      hackathon_count: user?.hackathon_count || '',
      phone_number: user?.phone_number || '',
    });
  }, [user]);

  if (!isOpen) return null;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

const handleSubmit = async () => {
  setLoading(true);
  setError('');

  // Gather only the changed fields:
  const changed: Record<string, any> = {};
  Object.keys(formData).forEach((key) => {
    // @ts-ignore
    if (formData[key] !== user?.[key]) {
      // @ts-ignore
      changed[key] = formData[key];
    }
  });

  // If nothing changed, just close the modal:
  if (Object.keys(changed).length === 0) {
    onClose();
    setLoading(false);
    return;
  }

  try {
    const resp = await SetUser(changed, user.email);
    if (resp.error) {
      setError(resp.error);
    } else {
      onUpdated();
      onClose();
    }
  } catch (e) {
    console.error(e);
    setError('Failed to update user');
  }

  setLoading(false);
};

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update User Profile</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input
              name="email"
              value={formData.email}
              readOnly
              className="mt-1 block w-full border rounded bg-gray-100 px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">GitHub</label>
            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Major</label>
            <input
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">School</label>
            <input
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Graduation Year</label>
            <input
              name="grad_year"
              value={formData.grad_year}
              onChange={handleChange}
              type="number"
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Shirt Size</label>
            <input
              name="shirt_size"
              value={formData.shirt_size}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Dietary Restrictions</label>
            <input
              name="dietary_restrictions"
              value={formData.dietary_restrictions}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Special Needs</label>
            <input
              name="special_needs"
              value={formData.special_needs}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Date of Birth</label>
            <input
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              type="date"
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Registration Status</label>
            <select
              name="registration_status"
              value={formData.registration_status}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            >
              <option value="unregistered">Unregistered</option>
              <option value="confirmation">Confirmation</option>
              <option value="registered">Registered</option>
              <option value="waitlist">Waitlist</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Level of Study</label>
            <select
              name="level_of_study"
              value={formData.level_of_study}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            >
              <option value="University (Undergraduate)">Undergraduate</option>
              <option value="University (Graduate)">Graduate</option>
              <option value="High School">High School</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Ethnicity</label>
            <input
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Hackathon Count</label>
            <input
              name="hackathon_count"
              value={formData.hackathon_count}
              onChange={handleChange}
              type="number"
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm">Phone Number</label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm">Short Answer</label>
            <input
              name="short_answer"                           
              value={formData.short_answer}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
