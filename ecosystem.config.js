module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "run start",
      cwd: "/home/ec2-user/web/resu-git",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      interpreter: "none",
    },
  ],
};
