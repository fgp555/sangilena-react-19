const viteApiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// console.log("VITE_API_URL", viteApiURL);

// export const isDevelopment = true;
export const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export let apiBaseURL = isLocalhost
  ? viteApiURL
  : window.location.hostname === "vite.fgp.one"
  ? "https://back.fgp.one"
  : "";

// export let apiBaseURL = "https://dev.frankgp.com";

// export let isDevelopment = isLocalhost || window.location.hostname === "dev.appsystered.com";
export let isDevelopment = isLocalhost || window.location.hostname === "back.fgp.one";
export let adminEmail = isLocalhost ? atob("ZmdwNTU1QGdtYWlsLmNvbQ==") : "";
export let adminPassword = isLocalhost ? atob("ZmdwNTU1QGdtYWlsLmNvbQ==") : "";

export let iconUserUrl = "https://i.postimg.cc/GmddyvS1/icon-user.webp";

export let TURNSTILE_CLIENT_KEY = "0x4AAAAAABbUSOZWSWvcDOez";

console.log("apiBaseURL", apiBaseURL);
console.log("adminEmail", adminEmail);
console.log("isDevelopment", isDevelopment);

export let playStoreUrl = "https://play.google.com/store/apps/details?id=com.fgp555.transpaservic";
