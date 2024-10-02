async function getCookies() {
  const res = await fetch(
    "https://www.ups.com/track",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.7",
        priority: "u=0, i",
        "sec-ch-ua": '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
    }
  );

  const rawCookies = res.headers.getSetCookie();

  const cookies = rawCookies.map((cookie) => cookie.split(" ")[0]);

  const cookiesString = cookies.join(" ");

  const cookiesObject = {};
  rawCookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookiesObject[name.trim()] = value.split(";")[0].trim();
  });

  return { cookiesString, cookiesObject };
}

async function main() {
  let cookies = await getCookies();
  console.log(cookies);
}

main();
