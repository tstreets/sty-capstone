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
        if(event == 'update user') {
            serverData.updatePlayer(info);
        }
    });

    socket.on('disconnect', ()=> {
        // console.log(`${socket.id} has left`);
        serverData.checkActivePlayers();
    });
})

const serverData = {
    activePlayers: [],
    addPlayer(playerInfo) {
        this.activePlayers.push({
            username: playerInfo.username,
            lastcheck: Date.now(),
            slots: playerInfo.slots || [  
                {name: 'None', texture: 'none'},
                {name: 'None', texture: 'none'},
                {name: 'None', texture: 'none'},
            ],
        });
    },
    getPlayerSlots(username) {
        const player = this.getPlayerInfo(username);
        return player.slots;
    },
    getPlayerInfo(username) {
        return this.activePlayers.find(playerCheck=> {
            return playerCheck.username == username;
        });
    },
    getPlayerIndex(username) {
        return this.activePlayers.findIndex(playerCheck=> {
            return playerCheck.username == username;
        });
    },
    updatePlayer(playerInfo) {
        const player = this.getPlayerIndex(playerInfo.username);
        this.activePlayers[player] = playerInfo;
        console.log(`Updated ${playerInfo.username} at ${Date.now()}`);
    },
    savePlayers() {
        for(let player of this.activePlayers) {
            fb.savePlayer(player);
        }
    },
    checkActivePlayers() {}
};

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

const fb = {
    loginUser(userInfo) {
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
                        serverData.addPlayer(userDoc.data());
                        userInfo.socket.emit('login', {
                            status: true,
                            user: {
                                username: userInfo.username,
                                save_username:  userInfo.save_username
                            },
                            slots: serverData.getPlayerSlots(userInfo.username)
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
    },
    signupUser(userInfo) {
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
                        serverData.addPlayer({username: userInfo.username});
                        UsersRef.add({
                            email: userInfo.email,
                            username: userInfo.username,
                            password: userInfo.password
                        });
                        userInfo.socket.emit('signup', {
                            status: 1,
                            username: userInfo.username,
                            slots: serverData.getPlayerSlots(userInfo.username)
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
    },
    savePlayer(userInfo) {
        const UsersRef = firestore.collection('Users');
        UsersRef
        .where('username', '==', userInfo.username)
        .get()
        .then(snapshot=> {
            if(!snapshot.empty) {
                const userRef = snapshot.docs[0];
                UsersRef
                .doc(userRef.id)
                .update(userInfo);
            }
        })
    }
};
console.log(`App is running on port ${port}`);