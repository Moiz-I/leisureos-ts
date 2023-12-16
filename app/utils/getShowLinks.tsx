"use client";

interface getShowLinksProps {
  showQuery: string;
  region: string;
}

export async function getShowLinks(props: getShowLinksProps) {
  const { showQuery, region } = props; //region = en_GB
  // if (true) {
  //   console.log("INSIDE")
  //   const locale = region;
  //   const type = "show";
  //   const n = 1;
  //   const query = showQuery;
  //   const res = await fetch(
  //     "https://apis.justwatch.com/content/titles/" +
  //       locale +
  //       '/popular?body={"page_size":' +
  //       n +
  //       ',"page":1,"query":"' +
  //       query.split(" ").join("+") +
  //       '","content_types":["' +
  //       type +
  //       '"]}'
  //   );
  //   const data = await res.json();

  //   return {
  //     data,
  //   };
  // }
  const url = "https://apis.justwatch.com/graphql";
  const query = {
    operationName: "GetSearchTitles",
    variables: {
      country: "GB",
      first: 5,
      language: "en",
      platform: "WEB",
      searchAfterCursor: "",
      searchTitlesFilter: { searchQuery: showQuery, personId: null },
      searchTitlesSortBy: "POPULAR",
      sortRandomSeed: 0,
    },
    query: `
      query GetSearchTitles($country: Country!, $first: Int! = 5, $language: Language!, $platform: Platform! = WEB, $searchAfterCursor: String, $searchTitlesFilter: TitleFilter, $searchTitlesSortBy: PopularTitlesSorting! = POPULAR, $sortRandomSeed: Int! = 0) {
        popularTitles(
          after: $searchAfterCursor
          country: $country
          filter: $searchTitlesFilter
          first: $first
          sortBy: $searchTitlesSortBy
          sortRandomSeed: $sortRandomSeed
        ) {
          edges {
            node {
              id
              content(country: $country, language: $language) {
                title
                __typename
              }
              offers(country: $country, platform: $platform) {
                monetizationType
                presentationType
                standardWebURL
                deeplinkURL(platform: $platform)
                package {
                  id
                  packageId
                  shortName
                  __typename
                }
                id
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
    `,
  };

  // Perform the POST request using fetch
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      const rawShows = data.data.popularTitles.edges;
      const offerArr = rawShows[0].node.offers;
      console.log("offerArr ", offerArr);
      // for (const offer of offerArr) {
      //   console.log("offer ", offer);
      //   return offer.standardWebURL;
      // }

      // const shows: string[] = [];
      // for (const show of rawShows) {
      //   const node = show.node;
      //   const showId = node.id;
      //   const showName = node.content.title;
      //   shows.push(showName);
      //   // Uncomment the following lines if you want to include the offers with monetizationType "flatrate"
      //   // const offers = node.offers;
      //   // for (const offer of offers) {
      //   //   if (offer.monetizationType === "flatrate") {
      //   //     shows.push({ id: showId, url: offer.standardWebURL });
      //   //     break;
      //   //   }
      //   // }
      // }
      // console.log("showsss ", shows);
      return offerArr;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
