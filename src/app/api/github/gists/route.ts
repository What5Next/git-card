import { NextResponse } from "next/server";
import {
  GistRouteType,
  GistRouteResponse,
  GitHubAPIError,
} from "@/types/github";
import {
  fetchGitHubAPI,
  handleGitHubError,
  validateRequiredParams,
} from "@/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as GistRouteType;

  const paramError = validateRequiredParams({ type }, ["type"]);
  if (paramError) {
    return NextResponse.json(paramError, { status: paramError.status });
  }

  try {
    switch (type) {
      case "public":
        return NextResponse.json<GistRouteResponse<"public">>(
          await fetchGitHubAPI("/gists/public")
        );
      case "specific":
        const gistId = searchParams.get("gistId");
        if (!gistId) {
          return NextResponse.json<GitHubAPIError>(
            { error: "Missing gistId parameter", status: 400 },
            { status: 400 }
          );
        }
        return NextResponse.json<GistRouteResponse<"specific">>(
          await fetchGitHubAPI(`/gists/${gistId}`)
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
