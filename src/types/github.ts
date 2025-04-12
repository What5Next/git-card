// GitHub API Response Types
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  topics: string[];
  visibility: string;
  forks: number;
  watchers: number;
  default_branch: string;
}

export interface GitHubGist {
  id: string;
  html_url: string;
  files: {
    [key: string]: {
      filename: string;
      type: string;
      language: string | null;
      raw_url: string;
      size: number;
    };
  };
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string | null;
  comments: number;
  user: GitHubUser | null;
  comments_url: string;
  owner: GitHubUser;
  truncated: boolean;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: GitHubUser;
  committer: GitHubUser;
}

export interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export interface GitHubTag {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  zipball_url: string;
  tarball_url: string;
}

export interface GitHubContent {
  type: "file" | "dir" | "symlink" | "submodule";
  encoding: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string | null;
}

export interface GitHubRelease {
  url: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  tarball_url: string;
  zipball_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  author: GitHubUser;
  assets: {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: string;
    uploader: GitHubUser;
    content_type: string;
    state: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
  }[];
}

export interface GitHubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubUser;
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string;
  }[];
  state: "open" | "closed";
  locked: boolean;
  assignee: GitHubUser | null;
  assignees: GitHubUser[];
  milestone: {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    description: string;
    creator: GitHubUser;
    open_issues: number;
    closed_issues: number;
    state: "open" | "closed";
    created_at: string;
    updated_at: string;
    due_on: string | null;
    closed_at: string | null;
  } | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  body: string;
}

// Route Parameter Types
export type UserRouteType =
  | "profile"
  | "repos"
  | "followers"
  | "following"
  | "gists";
export type RepoRouteType =
  | "info"
  | "commits"
  | "branches"
  | "tags"
  | "contents"
  | "releases"
  | "stargazers"
  | "forks"
  | "issues";
export type GistRouteType = "public" | "specific";
export type SearchRouteType = "repositories" | "users" | "issues";

// Route Response Types
export type UserRouteResponse<T extends UserRouteType> = T extends "profile"
  ? GitHubUser
  : T extends "repos"
  ? GitHubRepo[]
  : T extends "followers"
  ? GitHubUser[]
  : T extends "following"
  ? GitHubUser[]
  : T extends "gists"
  ? GitHubGist[]
  : never;

export type RepoRouteResponse<T extends RepoRouteType> = T extends "info"
  ? GitHubRepo
  : T extends "commits"
  ? GitHubCommit[]
  : T extends "branches"
  ? GitHubBranch[]
  : T extends "tags"
  ? GitHubTag[]
  : T extends "contents"
  ? GitHubContent
  : T extends "releases"
  ? GitHubRelease[]
  : T extends "stargazers"
  ? GitHubUser[]
  : T extends "forks"
  ? GitHubRepo[]
  : T extends "issues"
  ? GitHubIssue[]
  : never;

export type GistRouteResponse<T extends GistRouteType> = T extends "public"
  ? GitHubGist[]
  : T extends "specific"
  ? GitHubGist
  : never;

export type SearchRouteResponse<T extends SearchRouteType> =
  T extends "repositories"
    ? { items: GitHubRepo[]; total_count: number }
    : T extends "users"
    ? { items: GitHubUser[]; total_count: number }
    : T extends "issues"
    ? { items: GitHubIssue[]; total_count: number }
    : never;

// API Error Type
export interface GitHubAPIError {
  error: string;
  status: number;
}

// API Endpoint Types
export type GitHubAPIEndpoint = {
  users: {
    [username: string]: {
      profile: `/api/github/users/${string}?type=profile`;
      repos: `/api/github/users/${string}?type=repos`;
      followers: `/api/github/users/${string}?type=followers`;
      following: `/api/github/users/${string}?type=following`;
      gists: `/api/github/users/${string}?type=gists`;
    };
  };
  repos: {
    [owner: string]: {
      info: (
        repo: string
      ) => `/api/github/repos/${string}?type=info&repo=${string}`;
      commits: (
        repo: string
      ) => `/api/github/repos/${string}?type=commits&repo=${string}`;
      branches: (
        repo: string
      ) => `/api/github/repos/${string}?type=branches&repo=${string}`;
      tags: (
        repo: string
      ) => `/api/github/repos/${string}?type=tags&repo=${string}`;
      contents: {
        (
          repo: string
        ): `/api/github/repos/${string}?type=contents&repo=${string}`;
        (
          repo: string,
          path: string
        ): `/api/github/repos/${string}?type=contents&repo=${string}&path=${string}`;
      };
      releases: (
        repo: string
      ) => `/api/github/repos/${string}?type=releases&repo=${string}`;
      stargazers: (
        repo: string
      ) => `/api/github/repos/${string}?type=stargazers&repo=${string}`;
      forks: (
        repo: string
      ) => `/api/github/repos/${string}?type=forks&repo=${string}`;
      issues: (
        repo: string
      ) => `/api/github/repos/${string}?type=issues&repo=${string}`;
    };
  };
  gists: {
    public: `/api/github/gists?type=public`;
    specific: (
      gistId: string
    ) => `/api/github/gists?type=specific&gistId=${string}`;
  };
  search: {
    repositories: (
      query: string
    ) => `/api/github/search?type=repositories&q=${string}`;
    users: (query: string) => `/api/github/search?type=users&q=${string}`;
    issues: (query: string) => `/api/github/search?type=issues&q=${string}`;
  };
};

// API Response Types
export type GitHubAPIResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: GitHubAPIError;
    };

// API Client Type
export type GitHubAPIClient = {
  users: {
    getProfile: (username: string) => Promise<GitHubAPIResponse<GitHubUser>>;
    getRepos: (username: string) => Promise<GitHubAPIResponse<GitHubRepo[]>>;
    getFollowers: (
      username: string
    ) => Promise<GitHubAPIResponse<GitHubUser[]>>;
    getFollowing: (
      username: string
    ) => Promise<GitHubAPIResponse<GitHubUser[]>>;
    getGists: (username: string) => Promise<GitHubAPIResponse<GitHubGist[]>>;
  };
  repos: {
    getInfo: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubRepo>>;
    getCommits: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubCommit[]>>;
    getBranches: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubBranch[]>>;
    getTags: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubTag[]>>;
    getContents: (
      owner: string,
      repo: string,
      path?: string
    ) => Promise<GitHubAPIResponse<GitHubContent>>;
    getReleases: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubRelease[]>>;
    getStargazers: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubUser[]>>;
    getForks: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubRepo[]>>;
    getIssues: (
      owner: string,
      repo: string
    ) => Promise<GitHubAPIResponse<GitHubIssue[]>>;
  };
  gists: {
    getPublic: () => Promise<GitHubAPIResponse<GitHubGist[]>>;
    getSpecific: (gistId: string) => Promise<GitHubAPIResponse<GitHubGist>>;
  };
  search: {
    repositories: (
      query: string
    ) => Promise<
      GitHubAPIResponse<{ items: GitHubRepo[]; total_count: number }>
    >;
    users: (
      query: string
    ) => Promise<
      GitHubAPIResponse<{ items: GitHubUser[]; total_count: number }>
    >;
    issues: (
      query: string
    ) => Promise<
      GitHubAPIResponse<{ items: GitHubIssue[]; total_count: number }>
    >;
  };
};
