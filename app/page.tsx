import GetShow from "./GetShow";
import { SearchModal } from "./components/SearchShows/SearchModal";

export default function Home() {
  return (
    <div>
      <h1>hello</h1>
      {/* <GetShow /> */}
      <SearchModal />
      <a href="stremio://detail/series/tt21942866/?autoPlay={true}">Email Us</a>
    </div>
  );
}
