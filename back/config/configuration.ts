export default () => ({
  isDev: process.env.MODE === 'dev',
  database: {
    mongo: {
      uri: process.env.MONGODB_URI,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
});
