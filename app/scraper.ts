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
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    const body = await response.text();

    // Load the HTML content into cheerio.
    const $ = load(body);

    // Find all elements with the class 'd-title' and map them to an array of ShowInfo objects.
    const shows: ShowInfo[] = [];
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
