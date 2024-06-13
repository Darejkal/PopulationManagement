export const base_url = "http://localhost:5000/api/";
export const BASE_URL = "http://localhost:5000/api";

export const config = () => {
  console.log(localStorage.getItem("token"));
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  };
};
