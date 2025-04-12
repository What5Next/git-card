import { NextResponse } from "next/server";
import {
  SearchRouteType,
  SearchRouteResponse,
  GitHubAPIError,
} from "@/types/github";
import {
  fetchGitHubAPI,
  handleGitHubError,
  validateRequiredParams,
} from "@/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as SearchRouteType;
  const q = searchParams.get("q");

  const paramError = validateRequiredParams({ type, q }, ["type", "q"]);
  if (paramError) {
    return NextResponse.json(paramError, { status: paramError.status });
  }

  try {
    switch (type) {
      case "repositories":
        return NextResponse.json<SearchRouteResponse<"repositories">>(
          await fetchGitHubAPI(`/search/repositories?q=${q}`)
        );
      case "users":
        return NextResponse.json<SearchRouteResponse<"users">>(
          await fetchGitHubAPI(`/search/users?q=${q}`)
        );
      case "issues":
        return NextResponse.json<SearchRouteResponse<"issues">>(
          await fetchGitHubAPI(`/search/issues?q=${q}`)
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
