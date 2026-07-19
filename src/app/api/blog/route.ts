import { NextRequest, NextResponse } from "next/server";

// GET /api/blog — Proxy to WordPress REST API to avoid CORS + cache on edge
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "6";

    const wpUrl = process.env.WORDPRESS_URL;
    if (!wpUrl) {
      return NextResponse.json(
        { error: "WordPress URL not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `${wpUrl}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch blog posts", posts: [] },
        { status: res.status }
      );
    }

    const posts = await res.json();
    const totalPages = res.headers.get("X-WP-TotalPages") || "1";

    return NextResponse.json({
      posts,
      totalPages: parseInt(totalPages),
      page: parseInt(page),
    });
  } catch (error) {
    // Return empty array gracefully if WordPress is unreachable
    return NextResponse.json({ posts: [], totalPages: 0, page: 1 });
  }
}
