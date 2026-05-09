import useLocalStorage from "./useLocalStorage.js";

export default function useProfile() {
  const [profile, setProfile] = useLocalStorage("profile", {
    name: "UserName",
    college: "XYZ",
    avatar: null,
  });

  return { profile, setProfile };
}
