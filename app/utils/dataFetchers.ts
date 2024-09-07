import { serviceProps, Offer } from "@/app/types/addShowProps";
import { serviceMapping } from "@/app/utils/constants";

const getApiUrl = (endpoint: string) =>
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/api/${endpoint}`
    : `https://leisureos-ts.vercel.app/api/${endpoint}`;

export const fetchShowLinks = async (
  showName: string
): Promise<serviceProps[]> => {
  const response = await fetch(
    `${getApiUrl("justwatch")}?showName=${showName}`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();

  const newServices = data.map((offer: Offer) => ({
    serviceName: serviceMapping[offer.package.shortName] || "Unknown Service",
    link: offer.deeplinkURL,
  }));

  const uniqueServices = newServices.filter(
    (service: serviceProps, index: number, self: serviceProps[]) =>
      service.serviceName !== "Unknown Service" &&
      index === self.findIndex((t) => t.serviceName === service.serviceName)
  );

  const hiname = `https://hianime.to/search?keyword=${showName
    .toLowerCase()
    .replace(/ /g, "+")
    .replace(/[^a-zA-Z0-9+]/g, "")}`;
  const watchug = `https://watchug.com/tv-show/${showName
    .toLowerCase()
    //replace spaces with - and remove special characters not including -
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")}`;

  uniqueServices.push({ serviceName: "HiAnime", link: hiname });
  uniqueServices.push({ serviceName: "WatchUg", link: watchug });

  return uniqueServices;
};

export const fetchStremioId = async (
  showName: string
): Promise<serviceProps[]> => {
  const response = await fetch(`${getApiUrl("omdb")}?showName=${showName}`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();

  if (data.imdbID) {
    const stremioLink = `stremio://detail/series/${data.imdbID}/?autoPlay={true}`;
    return [{ serviceName: "Stremio", link: stremioLink }];
  }
  return [];
};

export const fetchShowWaveId = async (
  showName: string
): Promise<serviceProps[]> => {
  const response = await fetch(`${getApiUrl("omdb")}?showName=${showName}`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  if (data.imdbID) {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/find/${data.imdbID}?api_key=64f40f0ce0ea7527af4f34d01f55e83e&external_source=imdb_id`
    );
    if (!tmdbResponse.ok) throw new Error("TMDb API response was not ok");
    const tmdbData = await tmdbResponse.json();

    if (tmdbData.tv_results && tmdbData.tv_results.length > 0) {
      const tmdbId = tmdbData.tv_results[0].id;
      console.log("tmdbId", tmdbId);
      const link1 = `https://showwave.pw/media/tmdb-tv-${tmdbId}`;
      const link2 = `https://binged.in/watch/tv/${tmdbId}`;
      const link3 = `https://binged.in/watch/tv/${tmdbId}`;

      return [
        { serviceName: "ShowWave", link: link1 },
        { serviceName: "Binged", link: link2 },
      ];
    }
  }
  return [];
};

// export const fetchAniwaveLink = async (
//   showName: string
// ): Promise<serviceProps[]> => {
//   const response = await fetch(`${getApiUrl("aniwave")}?showName=${showName}`);
//   if (!response.ok) throw new Error("Network response was not ok");
//   const data = await response.json();

//   if (data[0]) {
//     return [
//       { serviceName: "Aniwave", link: `https://aniwave.to${data[0].link}` },
//     ];
//   }
//   return [];
// };
