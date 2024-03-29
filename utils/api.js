export async function fetchData({
  url,
  method,
  contentType,
  token,
  body,
} = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}${url}`, {
    method,
    cache: "no-store",
    headers: {
      ...(contentType ? { "Content-Type": contentType } : {}),
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      //window.location.href = "/authentication/login";
    } else throw data.message;
  }
  return data;
}

export async function fetchDownload({
  url,
  method,
  contentType,
  token,
  body,
} = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}${url}`, {
    method,
    cache: "no-store",
    headers: {
      ...(contentType ? { "Content-Type": contentType } : {}),
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "/authentication/login";
    }
  }
  return response;
}
