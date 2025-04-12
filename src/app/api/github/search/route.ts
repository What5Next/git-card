import { NextResponse } from "next/server";

const GITHUB_API_BASE = "https://api.github.com";

async function fetchGitHubAPI(endpoint: string) {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    switch (type) {
      case "repositories":
        return NextResponse.json(
          await fetchGitHubAPI(`/search/repositories?q=${query}`)
        );
      case "users":
        return NextResponse.json(
          await fetchGitHubAPI(`/search/users?q=${query}`)
        );
      case "issues":
        return NextResponse.json(
          await fetchGitHubAPI(`/search/issues?q=${query}`)
        );
      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
