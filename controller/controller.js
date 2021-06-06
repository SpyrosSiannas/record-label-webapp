'use strict';

const { request } = require('express');
const { ExpressHandlebars } = require('express-handlebars');
const session = require('express-session');
const model = require('../model/model');

exports.index = (req, res) => {
    res.render('index', {
        layout: 'main',
        title:"Home",
        src: "index",
        logged: req.session.loggedin,
        username: req.session.username
    });
}

exports.artists = (req, res) => {
    model.getArtists((artists)=>{    
        res.render('artists', {
            layout: 'main',
            title:"Our Artists",
            src: "artists",
            artists: artists,
            logged: req.session.loggedin,
            username: req.session.username
        });
    })
}

exports.merch = (req,res) => {
    model.getMerch((merch) => {
        res.render('merch', {
            layout: "main",
            title:"Merchandise",
            src:"merch",
            merch: merch,
            logged: req.session.loggedin,
            username: req.session.username
        });
    })
}

exports.events =  (req,res) => {
    model.getEvents((events) => {
        res.render('events', {
            layout: "main",
            title:"Events",
            src:"events",
            events: events,
            logged: req.session.loggedin,
            username: req.session.username,
        });
    });
}

exports.about = (req,res) => {
    res.render('about', {
        layout: 'main',
        title: 'About Coffeestained',
        src: 'about',
        logged: req.session.loggedin,
        username: req.session.username
    })
}

exports.contact = (req,res)=> {
    res.render('contact', {
        layout: 'main',
        title: 'Contact Us',
        src: 'contact',
        logged: req.session.loggedin,
        username: req.session.username
    });
}

exports.bio = (req,res) => {
    const artistId = Number(req.query.id);
    model.getArtistSingle(artistId, (artist, text) => {
            res.render('bio', {
                layout: 'main',
                title: artist.name,
                src: 'bio',
                bioText: text,
                artist: artist[0],
                logged: req.session.loggedin,
                username: req.session.username
            })
        }
    )
}

exports.auth = (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    if (username && password) {
        model.auth(username, password, (sqlUsername)=>{
            req.session.loggedin = true;
            req.session.username = sqlUsername;
            res.redirect('/')
        })
    }
    else {
        res.send("Something Went Wrong")
    }
}

exports.register = (req, res) => {
    const mail = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    if (mail && password && fname && lname) {
        model.register(mail,password,fname,lname, (sqlUsername) => {
            req.session.loggedin = true;
            req.session.username = sqlUsername;
            res.redirect('/')
        })
    }
}

exports.logout = (req,res) => {
    req.session.loggedin = false;
    req.session.username = '';
    res.redirect('/')
}