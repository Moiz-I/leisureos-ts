import scrapeShowTitles from "@/app/scraper";
import { load } from "cheerio";
import { NextRequest, NextResponse } from "next/server";

interface ShowInfo {
  title: string;
  link: string;
}
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showName = searchParams.get("showName") as string; // Type assertion
    const shows = await scrapeShowTitles(showName);

    return NextResponse.json(shows);
  } catch (error) {
    // res.status(500).json({ error: "Internal Server Error" });
    return NextResponse.error();
  }
}
