const devConfig = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: '3306',
    user: 'val',
    password: 'rootdb',
    database: 'projectDev'
  },
  migrations: {
    directory: './src/databases/migrations'
  },
  seeds: {
    directory: './src/databases/seeds'
  }
};

module.exports = {
  development: devConfig,
  production: {}
}
