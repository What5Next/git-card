import { NextResponse } from "next/server";
import {
  RepoRouteType,
  RepoRouteResponse,
  GitHubAPIError,
} from "@/types/github";
import {
  fetchGitHubAPI,
  handleGitHubError,
  validateRequiredParams,
} from "@/lib/github";

export async function GET(
  request: Request,
  { params }: { params: { owner: string; repo: string } }
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as RepoRouteType;
  const { owner, repo } = params;

  const paramError = validateRequiredParams({ type }, ["type"]);
  if (paramError) {
    return NextResponse.json(paramError, { status: paramError.status });
  }

  try {
    switch (type) {
      case "info":
        return NextResponse.json<RepoRouteResponse<"info">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}`)
        );
      case "commits":
        return NextResponse.json<RepoRouteResponse<"commits">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/commits`)
        );
      case "branches":
        return NextResponse.json<RepoRouteResponse<"branches">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/branches`)
        );
      case "tags":
        return NextResponse.json<RepoRouteResponse<"tags">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/tags`)
        );
      case "contents":
        const path = searchParams.get("path") || "";
        return NextResponse.json<RepoRouteResponse<"contents">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/contents/${path}`)
        );
      case "releases":
        return NextResponse.json<RepoRouteResponse<"releases">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/releases`)
        );
      case "stargazers":
        return NextResponse.json<RepoRouteResponse<"stargazers">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/stargazers`)
        );
      case "forks":
        return NextResponse.json<RepoRouteResponse<"forks">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/forks`)
        );
      case "issues":
        return NextResponse.json<RepoRouteResponse<"issues">>(
          await fetchGitHubAPI(`/repos/${owner}/${repo}/issues`)
        );
      default:
        return NextResponse.json<GitHubAPIError>(
          { error: "Invalid type parameter", status: 400 },
          { status: 400 }
        );
    }
  } catch (error) {
    const githubError = handleGitHubError(error);
    return NextResponse.json(githubError, { status: githubError.status });
  }
}
