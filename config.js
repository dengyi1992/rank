/**
 * Created by deng on 16-6-7.
 */
var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    upload: {
        path: path.join(__dirname, 'public/images/'),
        url: '/public/upload/'
    },

    /*db:{
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test1',
        port: 3306
    }*/

   db:{
       host: 'rm-2zeuwkk3t1j08a832.mysql.rds.aliyuncs.com',
       user: 'dataguiding',
       password: 'redhat@2016',
       database: 'rank',
       port: 3306
   }

};



module.exports = config;

