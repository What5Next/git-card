module.exports = {
  apps: [
    {
      name: "app",
      script: "pnpm",
      args: "start -- --hostname 0.0.0.0",
      interpreter: "bash",
      cwd: "/home/ec2-user/web/resu-git", // 프로젝트 위치
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
