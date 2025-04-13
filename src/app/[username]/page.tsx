"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import { Download, Eye, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import GitHubProfile, { GitHubData } from "@/features/profile/github-profile";
import { githubClient } from "@/lib/github/client";
import { useParams } from "next/navigation";
import { GitHubRepo, GitHubUser } from "@/types/github";

// Mock GitHub API data - in a real app, you would fetch this from the GitHub API
const mockGitHubData = {
  user: {
    login: "johndoe",
    name: "John Doe",
    avatar_url: "/images/placeholder.svg",
    html_url: "https://github.com/johndoe",
    bio: "Full-stack developer passionate about open source. Building tools that make developers' lives easier.",
    company: "@awesome-company",
    location: "San Francisco, CA",
    email: "john@example.com",
    public_repos: 45,
    public_gists: 12,
    followers: 320,
    following: 168,
    created_at: "2015-04-12T20:42:42Z",
    updated_at: "2023-09-18T15:30:10Z",
    hireable: true,
  },
  repos: [
    {
      name: "awesome-project",
      html_url: "https://github.com/johndoe/awesome-project",
      description:
        "Built a modern web application library using React and TypeScript, focusing on reusable components, UI library integration, and performance optimization.",
      fork: false,
      stargazers_count: 1245,
      watchers_count: 98,
      forks_count: 187,
      language: "TypeScript",
      open_issues_count: 23,
      topics: ["react", "typescript", "frontend", "ui-library"],
      created_at: "2020-06-15T14:22:40Z",
      updated_at: "2023-09-15T10:12:30Z",
      pushed_at: "2023-09-14T08:45:12Z",
    },
    {
      name: "data-visualizer",
      html_url: "https://github.com/johndoe/data-visualizer",
      description: "Interactive data visualization tool with D3.js integration",
      fork: false,
      stargazers_count: 876,
      watchers_count: 54,
      forks_count: 112,
      language: "JavaScript",
      open_issues_count: 15,
      topics: ["data-visualization", "d3js", "charts", "analytics"],
      created_at: "2021-02-10T09:15:22Z",
      updated_at: "2023-08-28T16:40:18Z",
      pushed_at: "2023-08-27T11:32:45Z",
    },
    {
      name: "api-toolkit",
      html_url: "https://github.com/johndoe/api-toolkit",
      description:
        "Developed an interactive data visualization tool integrating D3.js for creating dynamic and customizable charts and analytics dashboards.",
      fork: false,
      stargazers_count: 543,
      watchers_count: 32,
      forks_count: 78,
      language: "TypeScript",
      open_issues_count: 8,
      topics: ["api", "rest", "backend", "testing"],
      created_at: "2021-09-05T18:30:15Z",
      updated_at: "2023-09-10T14:22:36Z",
      pushed_at: "2023-09-09T20:15:42Z",
    },
  ],
  contributions: {
    total: 2547,
    last_year: 1283,
    current_streak: 42,
    longest_streak: 86,
    by_day: [4, 7, 12, 5, 8, 3, 9],
    by_language: [
      { language: "TypeScript", percentage: 45, color: "#3178c6" },
      { language: "JavaScript", percentage: 30, color: "#f1e05a" },
      { language: "Python", percentage: 15, color: "#3572A5" },
      { language: "Go", percentage: 10, color: "#00ADD8" },
    ],
  },
  organizations: [
    {
      login: "awesome-company",
      avatar_url: "https://picsum.photos/200/300/?blur​",
      description: "Building the future of web development",
    },
    {
      login: "open-source-collective",
      avatar_url: "https://picsum.photos/200/300/?blur​",
      description: "Advancing open source software",
    },
  ],
  pullRequests: {
    total: 342,
    merged: 287,
    open: 12,
    closed: 43,
  },
  issues: {
    total: 156,
    open: 18,
    closed: 138,
  },
};

export default function ResumeTemplate() {
  const { username } = useParams<{ username: string }>();

  const [editMode, setEditMode] = useState(false);
  const [gitHubData, setGitHubData] = useState(mockGitHubData);

  const [userProfile, setUserProfile] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const getUserProfile = async (username: string) => {
    const res = await githubClient.users.getProfile(username);

    setUserProfile(res.data);
  };

  const getRepos = async (username: string) => {
    const res = await githubClient.users.getRepos(username);

    setRepos(res.data ?? []);
  };

  // In a real app, you would fetch data from GitHub API here
  useEffect(() => {
    // This would be replaced with actual API calls
    // Example: fetch(`https://api.github.com/users/${username}`)
    console.log("Would fetch data for:", username);
    getUserProfile(username);
    getRepos(username);

    setGitHubData(mockGitHubData);

    document.title = `${username} - ResuGit`;
  }, [username]);

  const data: GitHubData | null = useMemo(() => {
    if (!userProfile) return null;

    return {
      user: {
        login: userProfile.login,
        name: userProfile.name,
        avatar_url: userProfile.avatar_url,
        html_url: userProfile.html_url,
        bio:
          userProfile.bio ??
          "Full-stack developer passionate about open source. Building tools that make developers' lives easier.",
        company: userProfile.company,
        location: userProfile.location,
        email: userProfile.email,
        public_repos: userProfile.public_repos,
        public_gists: userProfile.public_gists,
        followers: userProfile.followers,
        following: userProfile.following,
        created_at: userProfile.created_at,
        updated_at: userProfile.updated_at,
      },
      repos: repos.map((repo) => ({
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description ?? "",
        fork: repo.fork,
        language: repo.language ?? "",
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        topics: repo.topics,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
      })),
      contributions: {
        total: 0,
        last_year: 0,
        current_streak: 0,
        longest_streak: 0,
        by_day: [],
        by_language: [],
      },
      organizations: [],
      pullRequests: {
        total: 0,
        merged: 0,
        open: 0,
        closed: 0,
      },
      issues: {
        total: 0,
        open: 0,
        closed: 0,
      },
    } satisfies GitHubData;
  }, [userProfile, repos]);

  return (
    <div className="min-h-screen p-6 md:p-10 ">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6 items-center">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold text-white">ResumeGit</h1>
          </div>
          <div className="flex gap-3">
            {editMode && (
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  placeholder="GitHub username"
                  className="px-3 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            )}
            <Button
              onClick={() => setEditMode(!editMode)}
              variant="outline"
              className="bg-gray-800/50 text-gray-200 border-gray-700 hover:bg-gray-700/50"
              disabled
            >
              {editMode ? "Edit Mode" : "Preview Mode"}
            </Button>
          </div>
        </div>

        {data && (
          <GitHubProfile
            data={{ ...gitHubData, user: data.user }}
            aiSummary="Experienced full-stack developer with a passion for open-source contributions, specializing in building tools that streamline the development process. Committed to creating innovative solutions that enhance productivity for developers worldwide."
          />
        )}

        <div className="flex justify-center items-center gap-[20px]">
          <div
            role="button"
            className="bg-white flex items-center gap-2 px-[16px] py-[8px] rounded-[4px] text-black"
          >
            <Download className="h-[16px] w-[16px]" />
            <span>Download</span>
          </div>
          <div
            role="button"
            className="bg-white flex items-center gap-2 px-[16px] py-[8px] rounded-[4px] text-black"
          >
            <Eye className="h-[20px] w-[20px]" />
            <span>Preview</span>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>This GitHub resume is generated by AI.</p>
        </div>
      </div>
    </div>
  );
}
