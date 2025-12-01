import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, updateProfile as updateProfileApi } from "../api/profileApi";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Load profile once on app start
  const refreshProfile = async () => {
    try {
      const res = await getProfile();
      if (res.profile) setProfile(res.profile);
    } catch (err) {
      console.log("Profile load error:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  // Update profile using API
  const updateProfile = async (updatedProfile) => {
    const res = await updateProfileApi(updatedProfile);
    if (res.profile) {
      setProfile(res.profile);   // update locally
      return res.profile;
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, refreshProfile, updateProfile, loadingProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
