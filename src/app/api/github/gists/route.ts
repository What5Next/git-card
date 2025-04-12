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
  const gistId = searchParams.get("gistId");

  try {
    switch (type) {
      case "public":
        return NextResponse.json(await fetchGitHubAPI("/gists/public"));
      case "specific":
        if (!gistId) {
          return NextResponse.json(
            { error: "Gist ID is required" },
            { status: 400 }
          );
        }
        return NextResponse.json(await fetchGitHubAPI(`/gists/${gistId}`));
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
