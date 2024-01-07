// scraper.ts
import cheerio, { load } from "cheerio";

// Define the interface for the show information you want to return.
interface ShowInfo {
  title: string;
  link: string;
}

async function scrapeShowTitles(showName: string): Promise<ShowInfo[]> {
  const url = `https://aniwave.to/filter?keyword=${encodeURIComponent(
    showName
  )}`;

  try {
    // Fetch the HTML content from the URL.
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "content-type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        Dnt: "1",
        "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"macOS"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        Cookie: "LXgAzphRk7AhQ5CCJRVQeg2Zw6WvXlM0OlJoWQpa",
      },
    });
    const body = await response.text();

    // Load the HTML content into cheerio.
    const $ = load(body);

    // Find all elements with the class 'd-title' and map them to an array of ShowInfo objects.
    const shows: ShowInfo[] = [];
    shows.push({ title: "test", link: body });
    $(".d-title").each((index, element) => {
      const title = $(element).text().trim();
      const link = $(element).attr("href")?.trim();

      if (title && link) {
        shows.push({ title, link });
      }
    });

    return shows;
  } catch (error) {
    console.error("Error scraping show titles:", error);
    throw error;
  }
}

export default scrapeShowTitles;
