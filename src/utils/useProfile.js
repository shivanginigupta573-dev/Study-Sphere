import useLocalStorage from "./useLocalStorage.js";

export default function useProfile() {
  const [profile, setProfile] = useLocalStorage("profile", {
    name: "Shivangini",
    college: "NIT Durgapur",
    avatar: null,
  });

  return { profile, setProfile };
}
