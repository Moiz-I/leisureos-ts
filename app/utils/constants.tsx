import { MoonIcon, StarFilledIcon, SunIcon } from "@radix-ui/react-icons";

export const serviceMapping: { [key: string]: string } = {
  nfx: "Netflix",
  amp: "Prime",
  dnp: "Disney",
  bbc: "BBC",
  hbo: "HBO",
  cru: "Crunchyroll",
  now: "NowTV",
  al4: "Channel4",
  itv: "ITV",
  f4o: "All4",
  skt: "Sky",
  hlu: "Hulu",
  amz: "Amazon",
  itu: "Apple",
};

export const tagIconMap: Record<string, React.ReactNode> = {
  favourite: <StarFilledIcon color="purple" />,
  night: "🌃",
  morning: "🌅",
  anime: "🌸",
  comfort: "😂",
  lunch: "🍔",
  towatch: "⁉️",
  // Add more tags and their corresponding icons as needed
};
