// Update with your config settings.
const knexconfig = {
    development: {
      client: 'mysql',
      version: '5.7.35',
      connection: {
          host: '127.0.0.1',
          port : '3306',
          user: 'newpurr_user',
          password: 'newpurr_password',
          database: 'newpurr',
      },
    },
  };
  
  export default knexconfig
  