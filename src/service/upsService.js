/**
 * Fetches cookies from the UPS tracking page.
 *
 * @async
 * @function getCookies
 * @returns {Promise<{ cookiesString: string, cookiesObject: Object }>}
 * An object containing:
 * - cookiesString: A string of cookies joined by space.
 * - cookiesObject: An object mapping cookie names to their values.
 *
 * @throws {Error} If the fetch operation fails or if the response is not ok.
 */
export async function getCookies() {
  try {
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

    if (!res.ok) {
      throw new Error(
        `Error fetching cookies: ${res.status} ${res.statusText}`
      );
    }
    const rawCookies = res.headers.getSetCookie();

    const cookies = rawCookies.map((cookie) => cookie.split(" ")[0]);

    const cookiesString = cookies.join(" ");

    const cookiesObject = {};
    rawCookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookiesObject[name.trim()] = value.split(";")[0].trim();
    });

    return { cookiesString, cookiesObject };
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves the status of a package using the provided tracking number and cookies.
 *
 * @async
 * @function getStatus
 * @param {string} trackingNumber - The tracking number of the package.
 * @param {{ cookiesString: string, cookiesObject: Object }} cookies - An object containing cookies.
 * @returns {Promise<Object>} The JSON response containing the order status.
 *
 * @throws {Error} If the fetch operation fails or if the response is not ok.
 */
export async function getStatus(trackingNumber, cookies) {
  try {
    const res = await fetch(
      "https://webapis.ups.com/track/api/Track/GetStatus?loc=en_US",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
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
    if (!res.ok) {
      throw new Error(
        `Error fetching order status: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
