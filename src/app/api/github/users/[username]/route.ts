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

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const username = params.username;

  try {
    switch (type) {
      case "profile":
        return NextResponse.json(await fetchGitHubAPI(`/users/${username}`));
      case "repos":
        return NextResponse.json(
          await fetchGitHubAPI(`/users/${username}/repos`)
        );
      case "followers":
        return NextResponse.json(
          await fetchGitHubAPI(`/users/${username}/followers`)
        );
      case "following":
        return NextResponse.json(
          await fetchGitHubAPI(`/users/${username}/following`)
        );
      case "gists":
        return NextResponse.json(
          await fetchGitHubAPI(`/users/${username}/gists`)
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
