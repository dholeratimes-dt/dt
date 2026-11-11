// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/sitemap.xml");
  revalidatePath("/");
  revalidateTag("home-updates");
  revalidateTag("dholera-blogs");
  revalidateTag("dholera-blog-detail");
  revalidateTag("dholera-news");
  revalidateTag("dholera-news-detail");
  revalidateTag("dholera-sir-detail");
  revalidateTag("dholera-sir-project-info");
  revalidatePath("/dholera-updates/blogs");
  revalidatePath("/dholera-updates/blogs/[slug]", "page");
  revalidatePath("/dholera-updates/latest-updates");
  revalidatePath("/dholera-updates/latest-updates/[slug]", "page");
  revalidatePath("/dholera-sir/[slug]", "page");

  revalidateTag("redirect");
  return NextResponse.json({ revalidated: true });
}

