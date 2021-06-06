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
            regError : req.session.regError,
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

exports.myOrders = (req,res) => {
    // Check if user is logged in
    if (req.session.loggedin){
       const userId = req.session.userId;
       model.getOrders(userId, (orders) => {
            res.render('myorders', {
                layout: 'main',
                title: "My Orders",
                src: 'myorders',
                orders: orders,
                logged: req.session.loggedin,
                username: req.session.username,
                authError : req.session.authError,
                regError: req.session.regError,
                userId: req.session.userId
            })
       }) 
    } else {
        res.redirect('/')
    }
}

exports.myAccount = (req,res) => {
    if (req.query.success){
        var success = true;
    }
    if (req.query.error){
        var errorMsg = "E-mail already in use"
    }
    // Check if user is logged in
    if (req.session.loggedin){
       const userId = req.session.userId;
       model.myAccount(userId, (userDetails) => {
            res.render('accdetails', {
                layout: 'main',
                title: "Account Details",
                src: 'accdetails',
                userDetails: userDetails,
                logged: req.session.loggedin,
                username: req.session.username,
                authError : req.session.authError,
                regError: req.session.regError,
                userId: req.session.userId,
                success: success,  
                errorMsg: errorMsg
            })
       }) 
    } else {
        res.redirect('/')
    }
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
                req.session.regError = undefined;
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
                res.redirect('/');
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

exports.order = (req,res) => {
    var order = {}
    order.productId = req.body.productId;
    order.userId = req.body.userId;
    let current = new Date();
    let cDate = current.getFullYear() + '/' + (current.getMonth() + 1) + '/' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    order.date = dateTime;
    order.telephone = req.body.telephone;
    order.street = req.body.street;
    order.city = req.body.city;
    order.postcode = req.body.post_code;
    order.country = req.body.country;
    order.province = req.body.province;
    order.apt = req.body.apt;
    order.price = req.body.productPrice;
    model.placeOrder(order, (err, queryResult)=>{
        res.redirect(req.get('referer'));
    })
}

exports.updateAcc = (req,res) => {
    if (req.session.loggedin) {
        var newDetails = {};
        const userId = req.body.userId;
        newDetails.email = req.body.email;
        newDetails.street = req.body.street;
        newDetails.city = req.body.city;
        newDetails.country = req.body.country;
        newDetails.lname = req.body.lname;
        newDetails.fname = req.body.fname;
        newDetails.province = req.body.province;
        newDetails.telephone = req.body.telephone;
        newDetails.postal_code = req.body.post_code;
        if (req.body.apt) {
            newDetails.apt = req.body.apt;
        }
        model.updateAcc(userId, newDetails, (err,result)=>{
            if (err) {
                res.redirect("/accountDetails?error=1")
            } else if (result) {
                res.redirect("/accountDetails?success=1")
            }
        })
    }
}

exports.clearOrder = (req, res)  => {
    if (req.session.loggedin) {
        if (req.session.userId == req.query.userId){
            model.cancelOrder(req.query.orderId, () => {
                res.redirect('/myOrders');
            })
        }
    }
}

exports.disableSuccess = (req, res) => {
    req.session.regError = undefined;
    res.send()
};