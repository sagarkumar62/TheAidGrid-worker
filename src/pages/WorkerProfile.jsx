import React, { useState } from 'react';
import Button from '../components/Button';
import { User, Calendar, Phone, MapPin, IdCard, BadgeCheck, Briefcase, Languages, IndianRupee, FileText, Smartphone, Users } from 'lucide-react';
import WorkerNavbar from '../components/WorkerNavbar';

const initialProfile = {
  profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
  fullName: 'Sunita Devi',
  dob: '1995-05-10',
  gender: 'Female',
  contact: '9876543210',
  address: 'Sector 62, Noida',
  aadhaar: '1234-5678-9012',
  pan: 'ABCDE1234F',
  services: 'Housekeeping',
  experience: '3+ years',
  availability: 'Mon–Fri, 10 AM – 5 PM',
  languages: 'Hindi, English',
  expectedCharges: '350/day',
  pricingFlexibility: 'Yes',
  certifications: 'COVID Safety Certified, Housekeeping Level 2',
  references: 'Available upon request',
  smartphone: 'Yes',
  assistant: '',
};

const WorkerProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setFormData(profile);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(profile);
  };

  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">      <WorkerNavbar />
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>
      <form className="space-y-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={editMode ? formData.profilePicture : profile.profilePicture || 'https://via.placeholder.com/128?text=Profile'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-blue-600"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            )}
          </div>
        </div>
        {/* Step 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Full Name</label>
          </div>
          <input
            type="text"
            name="fullName"
            value={editMode ? formData.fullName : profile.fullName}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Date of Birth</label>
          </div>
          <input
            type="date"
            name="dob"
            value={editMode ? formData.dob : profile.dob}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Date of Birth"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Gender</label>
          </div>
          <select
            name="gender"
            value={editMode ? formData.gender : profile.gender}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Contact</label>
          </div>
          <input
            type="text"
            name="contact"
            value={editMode ? formData.contact : profile.contact}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Contact Number"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Address</label>
          </div>
          <input
            type="text"
            name="address"
            value={editMode ? formData.address : profile.address}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Address & Area"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        {/* Step 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Aadhaar</label>
          </div>
          <input
            type="text"
            name="aadhaar"
            value={editMode ? formData.aadhaar : profile.aadhaar}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Aadhaar Number"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">PAN/Voter ID</label>
          </div>
          <input
            type="text"
            name="pan"
            value={editMode ? formData.pan : profile.pan}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="PAN or Voter ID"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        {/* Step 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Services</label>
          </div>
          <input
            type="text"
            name="services"
            value={editMode ? formData.services : profile.services}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Type of Services"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Experience</label>
          </div>
          <input
            type="text"
            name="experience"
            value={editMode ? formData.experience : profile.experience}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Years of Experience"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Availability</label>
          </div>
          <input
            type="text"
            name="availability"
            value={editMode ? formData.availability : profile.availability}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Availability"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Languages</label>
          </div>
          <input
            type="text"
            name="languages"
            value={editMode ? formData.languages : profile.languages}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Languages Spoken"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        {/* Step 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Expected Charges</label>
          </div>
          <input
            type="text"
            name="expectedCharges"
            value={editMode ? formData.expectedCharges : profile.expectedCharges}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Expected Charges"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Pricing Flexibility</label>
          </div>
          <input
            type="text"
            name="pricingFlexibility"
            value={editMode ? formData.pricingFlexibility : profile.pricingFlexibility}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Pricing Flexibility"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        {/* Step 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Certifications</label>
          </div>
          <input
            type="text"
            name="certifications"
            value={editMode ? formData.certifications : profile.certifications}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Certifications or Trainings"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">References</label>
          </div>
          <input
            type="text"
            name="references"
            value={editMode ? formData.references : profile.references}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="References"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        {/* Step 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Smartphone</label>
          </div>
          <select
            name="smartphone"
            value={editMode ? formData.smartphone : profile.smartphone}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Do you use a smartphone?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <label className="font-medium w-32">Assistant</label>
          </div>
          <textarea
            name="assistant"
            value={editMode ? formData.assistant : profile.assistant}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="If not, who helps you?"
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>
      </form>
      <div className="mt-6 flex justify-end gap-4">
        {editMode ? (
          <>
            <Button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-black">Cancel</Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">Save</Button>
          </>
        ) : (
          <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white">Edit Profile</Button>
        )}
      </div>
    </div>
  );
};

export default WorkerProfile;