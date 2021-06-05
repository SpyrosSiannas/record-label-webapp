'use strict';

const { ExpressHandlebars } = require('express-handlebars');
const model = require('../model/model');

exports.index = (req, res) => {
    res.render('index', {
        layout: 'main',
        title:"Home",
        src: "index"
    });
}

exports.artists = (req, res) => {
    res.render('artists', {
        layout: 'main',
        title:"Our Artists",
        src: "artists"
    });
}

exports.merch = (req,res) => {
    res.render('merch', {
        layout: "main",
        title:"Merchandise",
        src:"merch"
    });
}

exports.events =  (req,res) => {
    res.render('events', {
        layout: "main",
        title:"Events",
        src:"events"
    });
}

exports.about = (req,res) => {
    res.render('about', {
        layout: 'main',
        title: 'About Coffeestained',
        src: 'about'
    })
}

exports.contact = (req,res)=> {
    res.render('contact', {
        layout: 'main',
        title: 'Contact Us',
        src: 'contact'
    });
}

exports.bio = (req,res) => {
    const artistId = req.query.id;
    res.render('bio', {
        layout: 'main',
        title: "Artist Name",
        src: 'bio',
        artistname: "Artist Name",
        profileimg: "img/gambino-article.jpg"
    })
}