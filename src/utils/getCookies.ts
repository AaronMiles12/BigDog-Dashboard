export function getCookie(cname: string) {
  const name = cname + "=";
  let value: string | null = "";
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      if (cookie.trim().startsWith(name)) {
        value = cookie.substring(name.length, cookie.length);
      }
    });
  } else value = null;

  return value;
}
