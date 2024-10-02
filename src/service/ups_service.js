async function getCookies() {
  const res = await fetch("https://www.ups.com/track", {
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
  });

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

async function getStatus(trackingNumber, cookies) {
  const res = await fetch(
    "https://webapis.ups.com/track/api/Track/GetStatus?loc=en_US",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua": '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sec-gpc": "1",
        "x-xsrf-token": cookies.cookiesObject["X-XSRF-TOKEN-ST"],
        cookie: cookies.cookiesString,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      },
      referrerPolicy: "same-origin",
      body: `{\"Locale\":\"en_US\",\"TrackingNumber\":[\"${trackingNumber}\"],\"Requester\":\"quic\",\"returnToValue\":\"\"}`,
      method: "POST",
    }
  );
  console.log(res.status);
  const data = await res.json();
  return data;
}

async function main() {
  let cookies = await getCookies();
  const result = await getStatus("1Z3TWW700309256282", cookies);
  console.log(result);
}

main();
