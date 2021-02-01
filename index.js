/**
 * Required Dependencies
 */
const http = require('http');
const path = require('path');
const express = require('express');
const engine = require('consolidate');

/**
 * Setup express app
 */
const app = express();
app.engine('pug', engine.pug);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use( express.static( path.join(__dirname, 'public') ) );

/**
 * Port number that server runs on
 */
const port = process.env.PORT || 3000;

/**
 * Web server for app
 */
const server = http.createServer(app);
server.listen(port);

/**
 * App handler for quick routes
 */
const routes = [
    {
        req: '/',
        path: 'index',
        data: {
            title: ''
        }
    },
    {
        req: '/about',
        path: 'about',
        data: {
            title: '- About'
        }
    },
    {
        req: '/blogs',
        path: 'blogs',
        data: {
            title: '- Blogs'
        }
    },
    {
        req: '/contact',
        path: 'contact',
        data: {
            title: '- Contact'
        }
    },
    {
        req: '/game',
        path: 'game',
        data: {
            title: '- Game'
        }
    },
    {
        req: '/login',
        path: 'login',
        data: {
            title: '- Login'
        }
    },
];
routes.forEach(route=> {
    app.get(route.req, function(req,res,next) {
        res.render(route.path, route.data);
    });
});