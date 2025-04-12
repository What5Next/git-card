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
  { params }: { params: { owner: string; repo: string } }
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const { owner, repo } = params;

  try {
    switch (type) {
      case "info":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}`)
        );
      case "commits":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/commits`)
        );
      case "branches":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/branches`)
        );
      case "tags":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/tags`)
        );
      case "contents":
        const path = searchParams.get("path") || "";
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/contents/${path}`)
        );
      case "releases":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/releases`)
        );
      case "stargazers":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/stargazers`)
        );
      case "forks":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/forks`)
        );
      case "issues":
        return NextResponse.json(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/issues`)
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
