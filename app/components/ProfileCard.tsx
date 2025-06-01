import { useState } from "react";
import { Card } from "~/components/ui/card";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  accountNumber: string;
  joinDate: string;
}

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "Amina Mohammed",
    email: "amina.mohammed@example.com",
    phone: "+254 712 345 678",
    address: "Nairobi, Kenya",
    accountNumber: "KES 1234567890",
    joinDate: "2024-01-15"
  });

  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <Card className="p-6 bg-white/90 hover:bg-white transition-all duration-300 hover:shadow-lg animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Edit2 className="h-5 w-5 mr-1" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <Save className="h-5 w-5 mr-1" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <X className="h-5 w-5 mr-1" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <User className="h-5 w-5 text-indigo-500 mt-1" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-500">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-indigo-500 mt-1" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-500">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile.email}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-indigo-500 mt-1" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-500">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile.phone}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-indigo-500 mt-1" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-500">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.address}
                onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile.address}</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Account Number</label>
              <p className="mt-1 text-gray-900">{profile.accountNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Member Since</label>
              <p className="mt-1 text-gray-900">{new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 