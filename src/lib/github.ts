import { GitHubAPIError } from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

export async function fetchGitHubAPI<T>(endpoint: string): Promise<T> {
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

export function handleGitHubError(error: unknown): GitHubAPIError {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";
  return { error: errorMessage, status: 500 };
}

export function createErrorResponse(
  error: GitHubAPIError,
  status: number = 500
) {
  return new Response(JSON.stringify(error), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function validateRequiredParams(
  params: Record<string, string | null>,
  required: string[]
): GitHubAPIError | null {
  for (const param of required) {
    if (!params[param]) {
      return {
        error: `${param} is required`,
        status: 400,
      };
    }
  }
  return null;
}
