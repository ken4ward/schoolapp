module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '185.164.137.106',
      username: 'root',
      // pem: './path/to/pem'
       password: 'H9Wbu5LpT171BAtie6'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'schoolapps',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://rabonni.com',
      MONGO_URL: 'mongodb://ken4ward:mynewdatabasepassword@ds259855.mlab.com:59855/rabonnischool',
      PORT: 3000
    },

     /*ssl: { // (optional)
    //   // Enables let's encrypt (optional)
       autogenerate: {
         email: 'kehindeadeoya@gmail.com',
    //     // comma separated list of domains
         domains: 'rabonni.com,www.rabonni.com'
       }
     },*/

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
