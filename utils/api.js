export async function fetchData({
  url,
  method,
  contentType,
  token,
  body,
} = {}) {
  console.log(contentType);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  if (!response.ok) {
    throw new Error("fetchData Failed");
  }
  return await response.json();
}
