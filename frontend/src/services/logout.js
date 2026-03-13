import API from "./api";

export async function logoutUser() {
  await API.post("/auth/logout");
  window.location.assign("/");
}
