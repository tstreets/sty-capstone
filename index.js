/**
 * Require dependencies
 */
const http = require('http');
const path = require('path');
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./p_admin/firebase-admin-sdk.json');
const socket_io = require('socket.io');

/**
 * Config express app handling
 */
const app = express();
app.use( express.static( path.join(__dirname, 'public') ) );

/**
 * Port number server runs on
 */
const port = process.env.PORT || 3000;

/**
 * Server for web application
 */
const server = http.createServer(app);
server.listen(port);

/**
 * Iniatialize web sockets for server
 */
const io = socket_io(server);
io.on('connection', socket=> {
    // console.log(`${socket.id} has joined`);

    socket.onAny((event, info)=> {
        info.socket = socket;
        if(event == 'login user') {
            fb.loginUser(info);
        }
        if(event == 'signup user') {
            fb.signupUser(info);
        }
    });

    socket.on('disconnect', ()=> {
        // console.log(`${socket.id} has left`);
    });
})

/**
 * Initialize firebase admin
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sty-capstone.firebaseio.com',
    storageBucket: 'sty-capstone.appspot.com'
});

const firestore = admin.firestore();
const storage = admin.storage();

const fb = {};
fb.loginUser = function(userInfo) {
    firestore
    .collection('Users')
    .where('username', '==', userInfo.username)
    .get()
    .then(snap=> {
        if(snap.empty) {
            userInfo.socket.emit('login', {
                status: false
            });
        }
        else {
            snap.docs.forEach((userDoc, index)=> {
                if(userDoc.data().password == userInfo.password) {
                    userInfo.socket.emit('login', {
                        status: true,
                        user: {
                            username: userInfo.username,
                            save_username:  userInfo.save_username
                        }
                    });
                }
                else if(index == snap.size - 1) {
                    userInfo.socket.emit('login', {
                        status: false
                    });
                }
            })
        }
    })
}
fb.signupUser = function(userInfo) {
    const UsersRef = firestore.collection('Users');
    UsersRef
    .where('email', '==', userInfo.email)
    .get()
    .then(snap=> {
        if(snap.empty) {
            UsersRef
            .where('username','==', userInfo.username)
            .get()
            .then(snapshot=> {
                if(snapshot.empty) {
                    UsersRef.add({
                        email: userInfo.email,
                        username: userInfo.username,
                        password: userInfo.password
                    });
                    userInfo.socket.emit('signup', {
                        status: 1
                    });
                }
                else {
                    userInfo.socket.emit('signup', {
                        status: 0,
                        fail: 'username'
                    });
                }
            })
        }
        else {
            userInfo.socket.emit('signup', {
                status: 0,
                fail: 'email'
            });
        }
    })
}

console.log(`App is running on port ${port}`);