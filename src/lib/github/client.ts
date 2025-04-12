import { GitHubAPIClient, GitHubAPIResponse } from "@/types/github";

async function fetchAPI<T>(url: string): Promise<GitHubAPIResponse<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data,
      };
    }

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        error:
          error instanceof Error ? error.message : "Network error occurred",
        status: 500,
      },
    };
  }
}

export const githubClient: GitHubAPIClient = {
  users: {
    getProfile: (username) =>
      fetchAPI(`/api/github/users/${username}?type=profile`),
    getRepos: (username) =>
      fetchAPI(`/api/github/users/${username}?type=repos`),
    getFollowers: (username) =>
      fetchAPI(`/api/github/users/${username}?type=followers`),
    getFollowing: (username) =>
      fetchAPI(`/api/github/users/${username}?type=following`),
    getGists: (username) =>
      fetchAPI(`/api/github/users/${username}?type=gists`),
  },
  repos: {
    getInfo: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=info`),
    getCommits: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=commits`),
    getBranches: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=branches`),
    getTags: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=tags`),
    getContents: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=contents`),
    getReleases: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=releases`),
    getStargazers: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=stargazers`),
    getForks: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=forks`),
    getIssues: (owner, repo) =>
      fetchAPI(`/api/github/repos/${owner}/${repo}?type=issues`),
  },
  gists: {
    getPublic: () => fetchAPI("/api/github/gists?type=public"),
    getSpecific: (gistId) =>
      fetchAPI(`/api/github/gists?type=specific&gistId=${gistId}`),
  },
  search: {
    repositories: (query) =>
      fetchAPI(
        `/api/github/search?type=repositories&q=${encodeURIComponent(query)}`
      ),
    users: (query) =>
      fetchAPI(`/api/github/search?type=users&q=${encodeURIComponent(query)}`),
    issues: (query) =>
      fetchAPI(`/api/github/search?type=issues&q=${encodeURIComponent(query)}`),
  },
};
