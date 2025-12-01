import { useProfile } from "../context/ProfileContext";
import Input from "../components/Input";
import {
  UserCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PlusIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react"; 
export default function Profile() {
  const {
    profile,
    setProfile,
    updateProfile,
    loadingProfile
  } = useProfile();

    const [errors, setErrors] = useState({
      education: {},
      experience: {}
    });

  // If profile is still loading
  if (loadingProfile || !profile) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading profile...</p>
    );
  }



  // ------------------------------
  // BASIC HANDLER
  // ------------------------------
  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  // ------------------------------
  // EDUCATION EDIT HANDLERS
  // ------------------------------
  const addEdu = () => {
    setProfile(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          schoolName: "",
          degree: "",
          major: "",
          startDate: "",
          endDate: "",
          percentageOrCGPA: ""
        }
      ]
    }));
  };

  const updateEduField = (i, key, value) => {
    const updated = [...profile.education];
    updated[i][key] = value;
    setProfile(prev => ({ ...prev, education: updated }));
  };

  const removeEdu = (i) => {
    const updated = profile.education.filter((_, idx) => idx !== i);
    setProfile(prev => ({ ...prev, education: updated }));
  };

  // ------------------------------
  // EXPERIENCE EDIT HANDLERS
  // ------------------------------
  const addExp = () => {
    setProfile(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          companyName: "",
          role: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          skillsUsed: []
        }
      ]
    }));
  };

  const updateExpField = (i, key, value) => {
    const updated = [...profile.experience];
    updated[i][key] = value;
    setProfile(prev => ({ ...prev, experience: updated }));
  };

  const removeExp = (i) => {
    const updated = profile.experience.filter((_, idx) => idx !== i);
    setProfile(prev => ({ ...prev, experience: updated }));
  };

  // ------------------------------
  // SAVE ALL CHANGES (Fixed & Clean)
  // ------------------------------
// ------------------------------
// SAVE ALL CHANGES (VALIDATED)
// ------------------------------
const saveAll = async () => {
  let newErrors = { education: {}, experience: {} };
  let hasError = false;

  // ---------- EDUCATION VALIDATION ----------
  profile.education.forEach((edu, i) => {
    if (!edu.schoolName || edu.schoolName.trim() === "") {
      newErrors.education[i] = { schoolName: "School Name is required" };
      hasError = true;
    }
  });

  // ---------- EXPERIENCE VALIDATION ----------
  profile.experience.forEach((exp, i) => {
    if (!exp.companyName || exp.companyName.trim() === "") {
      newErrors.experience[i] = { companyName: "Company Name is required" };
      hasError = true;
    }
  });

  // ---------- SHOW ERRORS IN UI ----------
  if (hasError) {
    setErrors(newErrors);
    return;
  }

  // ---------- CLEAR ERRORS IF VALID ----------
  setErrors({ education: {}, experience: {} });

  // ---------- CLEAN PAYLOAD ----------
  const cleanedProfile = {
    ...profile,
    education: profile.education.map(({ _id, ...rest }) => rest),
    experience: profile.experience.map(({ _id, ...rest }) => rest),
  };

  const res = await updateProfile(cleanedProfile);

  if (!res || res.error) {
    alert("Failed to update profile: " + (res?.error || "Unknown error"));
    return;
  }

  alert("Profile updated successfully!");
};

  const cancelChanges = () => {
    window.location.reload(); // reloads fresh profile from context
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7faff] to-[#eef2ff] px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-8">
          <UserCircleIcon className="w-10 h-10 text-blue-600" />
          Profile Settings
        </h1>

        {/* BASIC INFORMATION CARD */}
        <section className="bg-white rounded-xl border shadow-sm p-6 mb-10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <UserCircleIcon className="w-6 h-6 text-blue-600" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
            
            <Input
              label="Full Name"
              value={profile.name}
              onChange={e => handleChange("name", e.target.value)}
            />

            <Input
              label="Email"
              value={profile.email}
              onChange={e => handleChange("email", e.target.value)}
              icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="Mobile"
              value={profile.mobile}
              onChange={e => handleChange("mobile", e.target.value)}
              icon={<PhoneIcon className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="Full Address"
              value={profile.fullAddress}
              onChange={e => handleChange("fullAddress", e.target.value)}
              icon={<MapPinIcon className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="LinkedIn"
              value={profile.linkedin}
              onChange={e => handleChange("linkedin", e.target.value)}
              icon={<LinkIcon className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="GitHub"
              value={profile.github}
              onChange={e => handleChange("github", e.target.value)}
              icon={<LinkIcon className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="Portfolio"
              value={profile.portfolio}
              onChange={e => handleChange("portfolio", e.target.value)}
              icon={<LinkIcon className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="Resume URL"
              value={profile.resumeUrl}
              onChange={e => handleChange("resumeUrl", e.target.value)}
            />
          </div>
        </section>

        {/* EDUCATION */}
        <section className="bg-white rounded-xl border shadow-sm p-6 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              Education
            </h2>

            <button
              onClick={addEdu}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="w-5 h-5" /> Add
            </button>
          </div>

          {profile.education.map((edu, i) => (
            <div key={i} className="p-5 mb-6 border rounded-xl bg-gray-50 shadow-sm">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Input
                  label="School Name *"
                  value={edu.schoolName}
                  onChange={e => {
                    updateEduField(i, "schoolName", e.target.value);
                    setErrors(prev => ({
                      ...prev,
                      education: { ...prev.education, [i]: {} }
                    }));
                  }}
                  className={`${errors.education[i]?.schoolName ? "border-red-500" : ""}`}
                />

                {errors.education[i]?.schoolName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.education[i].schoolName}
                  </p>
                )}
              </div>
                <Input label="Degree" value={edu.degree} onChange={e => updateEduField(i, "degree", e.target.value)} />
                <Input label="Major" value={edu.major} onChange={e => updateEduField(i, "major", e.target.value)} />

                <Input
                  label="Start Date"
                  type="date"
                  value={edu.startDate?.slice(0, 10)}
                  onChange={e => updateEduField(i, "startDate", e.target.value)}
                />

                <Input
                  label="End Date"
                  type="date"
                  value={edu.endDate?.slice(0, 10)}
                  onChange={e => updateEduField(i, "endDate", e.target.value)}
                />

                <Input
                  label="Percentage / CGPA"
                  value={edu.percentageOrCGPA}
                  onChange={e => updateEduField(i, "percentageOrCGPA", e.target.value)}
                />
              </div>

              <button
                onClick={() => removeEdu(i)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700"
              >
                <TrashIcon className="w-4 h-4" /> Remove
              </button>
            </div>
          ))}
        </section>

        {/* EXPERIENCE */}
        <section className="bg-white rounded-xl border shadow-sm p-6 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BriefcaseIcon className="w-6 h-6 text-blue-600" />
              Experience
            </h2>

            <button
              onClick={addExp}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="w-5 h-5" /> Add
            </button>
          </div>

          {profile.experience.map((exp, i) => (
            <div key={i} className="p-5 mb-6 border rounded-xl bg-gray-50 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <Input
                  label="Company Name *"
                  value={exp.companyName}
                  onChange={e => {
                    updateExpField(i, "companyName", e.target.value);
                    setErrors(prev => ({
                      ...prev,
                      experience: { ...prev.experience, [i]: {} }
                    }));
                  }}
                  className={`${errors.experience[i]?.companyName ? "border-red-500" : ""}`}
                />

                {errors.experience[i]?.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience[i].companyName}
                  </p>
                )}
              </div>
                <Input label="Role" value={exp.role} onChange={e => updateExpField(i, "role", e.target.value)} />
                <Input label="Location" value={exp.location} onChange={e => updateExpField(i, "location", e.target.value)} />

                <Input
                  label="Start Date"
                  type="date"
                  value={exp.startDate?.slice(0, 10)}
                  onChange={e => updateExpField(i, "startDate", e.target.value)}
                />

                <Input
                  label="End Date"
                  type="date"
                  value={exp.endDate?.slice(0, 10)}
                  onChange={e => updateExpField(i, "endDate", e.target.value)}
                />
              </div>

              <textarea
                className="w-full mt-4 p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="Describe your experience..."
                value={exp.description}
                onChange={e => updateExpField(i, "description", e.target.value)}
              />

              <button
                onClick={() => removeExp(i)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700"
              >
                <TrashIcon className="w-4 h-4" /> Remove
              </button>
            </div>
          ))}
        </section>

        {/* SAVE & CANCEL BUTTONS */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={cancelChanges}
            className="px-5 py-2 rounded-lg border bg-white hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={saveAll}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
