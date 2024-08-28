// utils/fetcher.ts
export const fetcher = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

  const res = await fetch(`http://localhost:3000${url}`, {
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};
