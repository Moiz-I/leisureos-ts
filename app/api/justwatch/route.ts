import { getShowLinks } from "@/app/utils/getShowLinks";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showName = searchParams.get("showName") as string; // Type assertion
    const data = await getShowLinks({ showQuery: showName, region: "en_GB" });
    // const shows = await scrapeShowTitles(showName);
    return NextResponse.json(data);
    // return NextResponse.json(shows);
  } catch (error) {
    // res.status(500).json({ error: "Internal Server Error" });
    return NextResponse.error();
  }
}
