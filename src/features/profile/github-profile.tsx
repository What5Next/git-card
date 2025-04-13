"use client";

import {
  Activity,
  Award,
  Briefcase,
  Calendar,
  Eye,
  GitBranch,
  GitFork,
  Mail,
  MapPin,
  Star,
  Users,
  FileText,
  GitPullRequest,
  Book,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  company: string;
  location: string;
  email: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  hireable: boolean;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  open_issues_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface GitHubContributions {
  total: number;
  last_year: number;
  current_streak: number;
  longest_streak: number;
  by_day: number[];
  by_language: Array<{
    language: string;
    percentage: number;
    color: string;
  }>;
}

interface GitHubOrganization {
  login: string;
  avatar_url: string;
  description: string;
}

interface GitHubPullRequests {
  total: number;
  merged: number;
  open: number;
  closed: number;
}

interface GitHubIssues {
  total: number;
  open: number;
  closed: number;
}

interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  contributions: GitHubContributions;
  organizations: GitHubOrganization[];
  pullRequests: GitHubPullRequests;
  issues: GitHubIssues;
}

interface GitHubProfileProps {
  data: GitHubData;
}

export default function GitHubProfile({ data }: GitHubProfileProps) {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl mb-6 overflow-hidden border border-gray-700/50">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-700">
                  <Image
                    src={data.user.avatar_url}
                    alt={data.user.name}
                    width={100}
                    height={100}
                  />
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {data.user.name}{" "}
                      <span className="text-gray-400 text-sm font-normal">
                        @{data.user.login}
                      </span>
                    </h1>
                    <p className="text-gray-300 text-sm mt-1">
                      {data.user.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{data.user.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{data.user.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{data.user.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined{" "}
                      {new Date(data.user.created_at).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-white">
                  {data.user.public_repos}
                </div>
                <div className="text-xs text-gray-400">Repositories</div>
              </div>
              <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-white">
                  {data.user.followers}
                </div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-white">
                  {data.user.following}
                </div>
                <div className="text-xs text-gray-400">Following</div>
              </div>
              <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-white">
                  {data.user.public_gists}
                </div>
                <div className="text-xs text-gray-400">Gists</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl mb-6 overflow-hidden border border-gray-700/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-gray-300" />
              <h3 className="text-lg font-semibold text-white">AI Summary</h3>
            </div>
            <p className="text-gray-300 text-sm">{data.user.bio}</p>
          </div>
        </div>

        {/* Top Repositories */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl mb-6 overflow-hidden border border-gray-700/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="h-5 w-5 text-gray-300" />
              <h3 className="text-lg font-semibold text-white">
                Top Repositories
              </h3>
            </div>

            {data.repos.map((repo, index) => (
              <div
                key={index}
                className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-5 mb-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-white">
                    {repo.name}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {repo.forks_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {repo.watchers_count}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{repo.description}</p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {repo.topics.map((topic, i) => (
                    <Badge
                      key={i}
                      className="bg-gray-600/50 text-gray-300 border-none"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        repo.language === "TypeScript"
                          ? "#3178c6"
                          : repo.language === "JavaScript"
                          ? "#f1e05a"
                          : repo.language === "Python"
                          ? "#3572A5"
                          : "#00ADD8",
                    }}
                  ></div>
                  <span className="text-sm text-gray-300">{repo.language}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    Updated{" "}
                    {new Date(repo.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Activity */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl mb-6 overflow-hidden border border-gray-700/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-gray-300" />
              <h3 className="text-lg font-semibold text-white">
                Contribution Activity
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {data.contributions.total}
                </div>
                <div className="text-xs text-gray-400">Total Contributions</div>
              </div>
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {data.contributions.current_streak}
                </div>
                <div className="text-xs text-gray-400">
                  Current Streak (days)
                </div>
              </div>
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {data.contributions.last_year}
                </div>
                <div className="text-xs text-gray-400">
                  Contributions (last year)
                </div>
              </div>
            </div>

            <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-3 text-white">Languages</h4>
              <div className="space-y-3">
                {data.contributions.by_language.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">
                        {lang.language}
                      </span>
                      <span className="text-sm text-gray-400">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-600/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <GitPullRequest className="h-4 w-4 text-gray-300" />
                  <h4 className="font-medium text-white">Pull Requests</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xl font-bold text-white">
                      {data.pullRequests.total}
                    </div>
                    <div className="text-xs text-gray-400">Total</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {data.pullRequests.merged}
                    </div>
                    <div className="text-xs text-gray-400">Merged</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Book className="h-4 w-4 text-gray-300" />
                  <h4 className="font-medium text-white">Issues</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xl font-bold text-white">
                      {data.issues.total}
                    </div>
                    <div className="text-xs text-gray-400">Total</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {data.issues.closed}
                    </div>
                    <div className="text-xs text-gray-400">Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizations */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl mb-6 overflow-hidden border border-gray-700/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-gray-300" />
              <h3 className="text-lg font-semibold text-white">
                Organizations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.organizations.map((org, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img
                      src={org.avatar_url}
                      alt={org.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">@{org.login}</h4>
                    <p className="text-sm text-gray-300">{org.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Achievements */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl mb-6 overflow-hidden border border-gray-700/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-gray-300" />
              <h3 className="text-lg font-semibold text-white">
                GitHub Achievements
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {data.contributions.longest_streak}
                </div>
                <div className="text-sm text-gray-300">Longest Streak</div>
              </div>
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {Math.floor(data.contributions.total / 100)}
                </div>
                <div className="text-sm text-gray-300">
                  Contribution Milestones
                </div>
              </div>
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {Math.floor(data.pullRequests.merged / 10)}
                </div>
                <div className="text-sm text-gray-300">Pull Request Badges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
