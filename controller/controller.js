'use strict';

const { request } = require('express');
const { ExpressHandlebars } = require('express-handlebars');
const session = require('express-session');
const { isUndefined } = require('underscore');
const model = require('../model/model');

exports.index = (req, res) => {
    res.render('index', {
        layout: 'main',
        title:"Home",
        src: "index",
        logged: req.session.loggedin,
        username: req.session.username,
        authError : req.session.authError,
        regError: req.session.regError,
        userId: req.session.userId
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
            username: req.session.username,
            authError : req.session.authError,
            regError: req.session.regError,
            userId: req.session.userId
        });
    })
}

exports.merch = (req,res) => {
    model.getMerch(req.session.userId, (merch) => {
        res.render('merch', {
            layout: "main",
            title:"Merchandise",
            src:"merch",
            merch: merch,
            logged: req.session.loggedin,
            username: req.session.username,
            authError : req.session.authError,
            regError: req.session.regError,
            userId: req.session.userId
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
            authError : req.session.authError,
            regError: req.session.regError,
            userId: req.session.userId
        });
    });
}

exports.about = (req,res) => {
    res.render('about', {
        layout: 'main',
        title: 'About Coffeestained',
        src: 'about',
        logged: req.session.loggedin,
        username: req.session.username,
        authError : req.session.authError,
        regError: req.session.regError,
        userId: req.session.userId
    })
}

exports.contact = (req,res)=> {
    res.render('contact', {
        layout: 'main',
        title: 'Contact Us',
        src: 'contact',
        logged: req.session.loggedin,
        username: req.session.username,
        authError : req.session.authError,
        regError: req.session.regError,
        userId: req.session.userId
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
                username: req.session.username,
                authError : req.session.authError,
                regError: req.session.regError,
                userId: req.session.userId
            })
        }
    )
}

exports.auth = (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    if (username && password) {
        model.auth(username, password, (sqlUsername, userId)=>{
            if (sqlUsername){
                req.session.loggedin = true;
                req.session.username = sqlUsername;
                req.session.authError = false;
                req.session.userId = userId;
                res.redirect(req.get('referer'))
            } else {
                req.session.regError = undefined;
                req.session.authError = true;
                req.session.username = undefined;
                req.session.loggedin = false;
                res.redirect(req.get('referer'))
            }
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
        model.register(mail,password,fname,lname, (sqlUsername, userId) => {
            if (sqlUsername) {
                req.session.loggedin = true;
                req.session.username = sqlUsername;
                req.session.regError = false;
                req.session.userId = userId;
                res.redirect(req.get('referer'));
            } else {
                req.session.authError = undefined;
                req.session.regError = true;
                req.session.userId = undefined;
                req.session.loggedin = false;
                res.redirect(req.get('referer'));
            }
        })
    }
}

exports.logout = (req,res) => {
    req.session.destroy()
    res.redirect(req.get('referer'))
}