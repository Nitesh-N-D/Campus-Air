import API from "./api";

export async function logoutUser() {
  localStorage.removeItem("campus_air_token");
  await API.post("/auth/logout").catch(() => null);
  window.location.assign("/");
}
