const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!).token
        : null
      : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 403) {
    localStorage.removeItem("user");
    console.error("Forbidden: User has been logged out.");
    window.location.replace("/");
  }

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
