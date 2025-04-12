import { NextResponse } from "next/server";
import {
  UserRouteType,
  UserRouteResponse,
  GitHubAPIError,
} from "@/types/github";
import {
  fetchGitHubAPI,
  handleGitHubError,
  validateRequiredParams,
} from "@/lib/github";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as UserRouteType;
  const username = params.username;

  const paramError = validateRequiredParams({ type }, ["type"]);
  if (paramError) {
    return NextResponse.json(paramError, { status: paramError.status });
  }

  try {
    switch (type) {
      case "profile":
        return NextResponse.json<UserRouteResponse<"profile">>(
          await fetchGitHubAPI(`/users/${username}`)
        );
      case "repos":
        return NextResponse.json<UserRouteResponse<"repos">>(
          await fetchGitHubAPI(`/users/${username}/repos`)
        );
      case "followers":
        return NextResponse.json<UserRouteResponse<"followers">>(
          await fetchGitHubAPI(`/users/${username}/followers`)
        );
      case "following":
        return NextResponse.json<UserRouteResponse<"following">>(
          await fetchGitHubAPI(`/users/${username}/following`)
        );
      case "gists":
        return NextResponse.json<UserRouteResponse<"gists">>(
          await fetchGitHubAPI(`/users/${username}/gists`)
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
