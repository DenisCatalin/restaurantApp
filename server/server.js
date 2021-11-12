const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const app = express();
const saltRounds = 15;
app.use(express.json());
app.use(cors());

const { PORT, MAILUSER, MAILPASS, HOST, DBUSER, DATABASE, REFRESH_TOKEN_EXPIRE } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAILUSER,
        pass: MAILPASS
    }
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : HOST,
        user : DBUSER,
        password : '',
        database : DATABASE
    }
});

app.post('/register', async (req, res) => {
    const { username, password, email, gender, birthDay, birthMonth, birthYear, ipAddress } = req.body;

    try {
        const birthdayString = `${birthMonth}-${birthDay}-${birthYear}`;

        const user = await knex('login')
        .select('Email')
        .where({ Email: email });

        if(user[0] === undefined) {
            knex('users')
            .insert({
                Username: username,
                Email: email,
                Gender: gender ? 'Female' : 'Male',
                Birthday: birthdayString,
                IP: ipAddress,
                EmailConfirmation: 0
            })
            .then(() => {
                bcrypt.hash(password, saltRounds, (error, hash) => {
                    if (error) { console.log(error); return; }
                    knex('login')
                    .insert({
                        Hash: hash,
                        Email: email,
                        Date: new Date()
                    })
                    .then(() => {
                        knex('users')
                        .select('*')
                        .where({ Username: username })
                        .then(response => {

                            knex('usercart')
                            .insert({ ForID: response[0].ID })
                            .then(console.log)

                            const mailOptions = {
                                from: MAILUSER,
                                to: 'deniscotecata@gmail.com',
                                subject: `Email validation for ${username} - Food Application`,
                                text: `Hello, ${username}!\n\nYou have recieved this message because you have registered to our Food Application platform.\nThank you and we hope we'll be hearing from you soon!\n\nIn order to activate your account and have full acces of it on our website, there is one last step:\nConfirm your email address by clicking this link: http://localhost:3000/confirmation/${response[0].ID}\n\nBest wishes,\nFood Application Team.`
                            };
        
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) console.log(error);
                                else console.log("Email sent at:" + info.envelope.to);
                            });
                            res.send({ message: "Registered" })
                        }).catch(err => console.log(err));

                    });
                });    
            });
        } else {
            console.log('exista');
            res.send({ message: "There is already a user registered with this e-mail address" });
        }
        
    }
    catch(err) { console.log(err); }

});

function auth(token) {
    let userID = 0;
    jwt.verify(token, 'refresh', (err, user) => {
        if(!err) { userID = user.user; } 
        else userID = 0;    
    })
    return userID;
}

app.get('/confirmEmail/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await knex('users')
        .select('*')
        .where({
            ID: id,
            EmailConfirmation: 0
        })
        if(data[0] !== undefined) {
            knex('users')
            .update({ EmailConfirmation: 1 })
            .where({ ID: id })
            .then(() => { res.send({message: 'Validation Complete'}); });

            const mailOptions = {
                from: MAILUSER,
                to: 'deniscotecata@gmail.com',
                subject: `Confirmation for ${data[0].Username} - Food Application`,
                text: `Hello, ${data[0].Username}!\n\nYou have recieved this message because you have confirmed your e-mail as a valid one. Feel free to explore our website and if you ever have a problem or a question feel free to contact us!\n\nBest wishes,\nFood Application Team.`
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.log(error);
                else console.log("Email sent at:" + info.envelope.to);
            });
        } else res.send({message: 'No validation needed'});
    }
    catch(err) { console.log(err); }
});

app.post('/login', async (req, res) => {
    const { password, email, date, protocol } = req.body;
    let userID = 0;
    try{
        const data = await knex('login')
        .select('*')
        .where({ Email: email })
        if(data[0] !== undefined) {
            const isValid = bcrypt.compareSync(password, data[0].Hash);
            if(isValid) {
                const user = await knex('users')
                .select('*')
                .where({ Email: email })
                if(user[0].EmailConfirmation !== 1) return res.send({message: 'Your e-mail addres has not been confirmed yet'});
                if(user[0] !== undefined) {
                    if(protocol === user[0].IP) {
                        const tokenExist = await knex('tokens')
                        .select('*')
                        .where({ ID: user[0].ID })
                        if(tokenExist[0] !== undefined) {
                            const actualDate = new Date().getTime();
                            if(tokenExist[0].DateToken < actualDate) {
                                const token = jwt.sign({user: user[0].ID}, 'refresh', { expiresIn: REFRESH_TOKEN_EXPIRE });
                                knex('tokens')
                                .update({ 
                                    Token: token,
                                    DateToken: date
                                })
                                .where({ ID: user[0].ID })
                                .then(console.log);
                                res.send({message: 'Logged', token: token, context: userID})
                            } else {
                                res.send({message: 'Logged', token: tokenExist[0].Token, context: userID});
                            }
                        } else {
                            const token = jwt.sign({user: user[0].ID}, 'refresh', { expiresIn: REFRESH_TOKEN_EXPIRE });
                            jwt.verify(token, 'refresh', (err, user) => {
                                if(!err) {
                                    userID = user.user;
                                } else userID = 0;    
                            })
                            knex('tokens')
                            .insert({ 
                                Token: token,
                                DateToken: date
                            })
                            .then(console.log);
                            res.send({message: 'Logged', token: token, context: userID})
                        }
                    } else {
                        const mailOptions = {
                            from: MAILUSER,
                            to: 'deniscotecata@gmail.com',
                            subject: `New login device for ${user[0].Username} - Food Application`,
                            text: `Hello, ${user[0].Username}!\n\nYou have recieved this message because you tried to log in from another device.\n\nIt wasn't you?\nNo worries! Your account will need to be re-validated in order to gain access on our platform again.\nIf it was you though, you will still have to re-validate your email address in order to gain a full access on our platform. (That's for security reasons)\nHere is the link for you to re-validate your email address: http://localhost:3000/confirmation/${user[0].ID}\n\nBest wishes,\nFood Application Team.`
                        };
    
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) console.log(error);
                            else console.log("Email sent at:" + info.envelope.to);
                        });

                        knex('users')
                        .update({ EmailConfirmation: 0, IP: protocol })
                        .where({ ID: user[0].ID })
                        .then(console.log);
                        res.send({message: 'New device login. An email has been sent to you.'});
                    }
                }    
            } else return res.send({message: 'Wrong credentials'});
        } else return res.send({message: 'User does not exist'});
    }
    catch(err) { console.log(err); }
});

app.get('/schedule', async (_req, res) => {
    try {
        const data = await knex('schedule')
        .select('*')
        res.send(data);
    }
    catch(err) { console.log(err); }
});

app.get('/schedule/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const data = await knex('schedule')
        .select('*')
        .where({ EventMonth: id })
        res.send(data);
    }
    catch(err) { console.log(err); }
});

app.get('/viewgallery/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const comments = await knex('gallerycomments')
        .select('*')
        .where({ ForID: id })
        res.send(comments);
    }
    catch(err) { console.log(err); }
});

app.post('/viewgallery/:id', async (req, res) => {
    const {id} = req.params;
    const{authorization, comment} = req.body;

    const userID = auth(authorization);

    try {
        const user = await knex('users')
        .select('*')
        .where({ ID: userID })
        if(user[0] !== undefined) {
            await knex('gallerycomments')
            .insert({
                Username: user[0].Username,
                Date: new Date(),
                Comment: comment,
                ForID: id
            })
            res.send({message: 'Comment posted'});
        } else console.log(`${userID} is not registered`);
    }
    catch(err) { console.log(err); }

});

app.get('/getphotolikes/:id', async (req, res) => {
    const {id} = req.params;
    
    try{
        await knex('gallerylikes')
        .select('Likes')
        .where({ photoID: id })
        .then((likes) => res.send(likes[0]));
    }
    catch(err) { console.log(err); }
});

app.get('/getuserlikes/:id', async (req, res) => {
    const {id} = req.params;
    const userID = auth(id);
    try {
        const user = await knex('users')
        .select('photoLikes')
        .where({ ID: userID })
        if(user[0] !== undefined) res.send(user[0].photoLikes);
        else console.log(`Couldn't get likes for user ${userID}`);    
        res.status(200);
    }
    catch(err) { console.log(err); }
});

app.post('/decreaseLike/:id', async (req, res) => {
    const {id} = req.params;
    const {authorization} = req.body;
    const userID = auth(authorization);
    try {
        const user = await knex('users')
        .select('*')
        .where({ ID: userID })
        if(user[0] !== undefined) {
            const array = user[0].photoLikes;
            let replaceString = '';
            replaceString = array.split('|');
            replaceString[id] = 0; 

            await knex('users')
            .update({ photoLikes: replaceString.toString().replaceAll(',', '|') })
            .where({ ID: userID })
            .then(async() => {
                knex('gallerylikes')
                .decrement('Likes', 1)
                .where({ photoID: id })
                .then(() => console.log(`Like removed from photo ${id}`));
                res.send({message: `Like removed from photo ${id} by ${userID}`});
            })
        } else console.log(`It seems that ${userID} isn't registered.`);
    }
    catch(err) { console.log(err); }
});

app.post('/increaseLike/:id', async (req, res) => {
    const {id} = req.params;
    const {authorization} = req.body;
    const userID = auth(authorization);

    try {
        const user = await knex('users')
        .select('*')
        .where({ ID: userID })
        if(user[0] !== undefined) {
            const array = user[0].photoLikes;
            let replaceString = '';
            replaceString = array.split('|');
            replaceString[id] = 1; 

            await knex('users')
            .update({ photoLikes: replaceString.toString().replaceAll(',', '|') })
            .where({ ID: userID })
            .then(async() => {
                await knex('gallerylikes')
                .increment('Likes', 1)
                .where({ photoID: id })
                .then(() => console.log(`Like added to photo ${id}`));
                res.send({message: `Like added for photo ${id} by ${userID}`});
            })
        } else console.log(`It seems that ${userID} isn't registered.`);
    }
    catch(err) { console.log(err); }
});

app.get('/checkBookingDate/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const row = await knex('reservations')
        .select('*')
        .where({ ReservationDate: date });
        if(row[0] !== undefined) res.send(row[0]);
        else res.send({SeatsTaken: '0|0|0|0|0|0|0|0|0'});
    }
    catch(err) { console.log(err); }
});

async function confirmTables(name, date, tables, seats) {
    try{
        const mailOptions = {
            from: MAILUSER,
            to: 'deniscotecata@gmail.com',
            subject: `Booking confirmation for ${name} - ${date} - Food Application`,
            text: `Hello, ${name}!\n\nYour booking has been confirmed for ${tables.length > 1 ? 'tables' : 'table'}: [${tables} for ${seats}] at ${date}\nIf you have any questions or encounter any issue, feel free to contact us.\n\nBest wishes,\nFood Application Team.`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            else console.log("Email sent at:" + info.envelope.to);
        });
    
        await knex('bookings')
        .insert({
            bookingFor: name,
            bookingTables: tables,
            bookingSeats: seats,
            bookingDate: date
        })
        .then(console.log)
        .catch(err => console.log(err));

        await knex('users')
        .increment('TotalBookings', 1)
        .where({ Username: name })
        .then(() => console.log);
    } catch(err) { console.log(err) }
}

app.post('/addTablesToBooking/:date', async (req, res) => {
    const { date } = req.params;
    const { tables, name, seats } = req.body;

    console.log(name);

    let taken = false;

    const checkDate = await knex('reservations')
    .select('*')
    .where({ ReservationDate: date })

    if(tables.length > 1) {
        try {
            if(checkDate[0] !== undefined) {
                const array = checkDate[0].SeatsTaken;
                let replaceString = '';
                replaceString = array.split('|');
                if(tables.length > 1) {
                    tables.map((table) => {
                        const id = table-1;
                        if(replaceString[id] === '0') replaceString[id] = 1;
                        else {
                            console.log('Something went wrong with storing selected multiple seats');
                            taken = true;
                        }
                    })
                }
                if(taken === true) {
                    res.send({message: 'A seat has been taken meanwhile.'});
                } else {
                    const getUserEmail = await knex('users')
                    .select('*')
                    .where({ Username: name })
                    if(getUserEmail[0].Email !== undefined) {
                        await knex('reservations')
                        .update({ SeatsTaken: replaceString.toString().replaceAll(',', '|') })
                        .where({ ReservationDate: date })
                        .catch(err => console.log(err));
                        confirmTables(name, date, tables.toString().replaceAll(',', '|'), seats);
                        res.send({message: 'Complete'});
                    } else res.send({message: 'Cannot send the confirmation e-mail'})   
                }
                taken = false;
            } else {
                const addRow = await knex('reservations')
                .insert({ ReservationDate: date })
                .catch(err => console.log(err));
                if(addRow !== undefined) {
                    const checkDate = await knex('reservations')
                    .select('*')
                    .where({ ReservationDate: date })
                    if(checkDate[0] !== undefined) {
                        const array = checkDate[0].SeatsTaken;
                        let replaceString = '';
                        replaceString = array.split('|');
                        if(tables.length > 1) {
                            tables.map((table) => {
                                const id = table-1;
                                if(replaceString[id] === '0') replaceString[id] = 1;
                                else {
                                    console.log('Something went wrong with storing selected multiple seats');
                                    taken = true;
                                }
                            })
                        }
                        if(taken === true) {
                          res.send({message: 'A seat has been taken meanwhile.'});
                        } else {
                            const getUserEmail = await knex('users')
                            .select('Email')
                            .where({ Username: name })
                            if(getUserEmail[0] !== undefined) {
                                await knex('reservations')
                                .update({ SeatsTaken: replaceString.toString().replaceAll(',', '|') })
                                .where({ ReservationDate: date })
                                .catch(err => console.log(err));
                                confirmTables(name, date, tables.toString().replaceAll(',', '|'), seats);
                                res.send({message: 'Complete'});
                            }    
                        }
                        taken = false;
                    }
                }        
            }    
        }
        catch(err) { console.log(err); }
    } else {
        try { 
            const checkDate = await knex('reservations')
            .select('*')
            .where({ ReservationDate: date })
            if(checkDate[0] !== undefined) {
                const array = checkDate[0].SeatsTaken;
                let replaceString = '';
                const id = tables-1;
                replaceString = array.split('|');
                if(replaceString[id] === '0') {
                    replaceString[id] = 1;
                    await knex('reservations')
                    .update({ SeatsTaken: replaceString.toString().replaceAll(',', '|') })
                    .where({ ReservationDate: date })
                    .catch(err => console.log(err));
                    const getUserEmail = await knex('users')
                    .select('Email')
                    .where({ Username: name })
                    if(getUserEmail[0] !== undefined) confirmTables(name, date, tables.toString().replaceAll(',', '|'), seats);
                    res.send({message: 'Complete'})
                } else { res.send({message: 'A seat has been taken meanwhile.'}); }
            } else {
                const addRow = await knex('reservations')
                .insert({ ReservationDate: date })
                .catch(err => console.log(err));
                if(addRow !== undefined) {
                    const checkDate = await knex('reservations')
                    .select('*')
                    .where({ ReservationDate: date })
                    if(checkDate[0] !== undefined) {
                        const array = checkDate[0].SeatsTaken;
                        let replaceString = '';
                        const id = tables-1;
                        replaceString = array.split('|');
                        if(replaceString[id] === '0') {
                            replaceString[id] = 1;
                            await knex('reservations')
                            .update({ SeatsTaken: replaceString.toString().replaceAll(',', '|') })
                            .where({ ReservationDate: date })
                            .catch(err => console.log(err));
                            const getUserEmail = await knex('users')
                            .select('Email')
                            .where({ Username: name })
                            if(getUserEmail[0] !== undefined) confirmTables(name, date, tables.toString().replaceAll(',', '|'), seats);
                            res.send({message: 'Complete'})
                        } else { res.send({message: 'A seat has been taken meanwhile.'}); }
                    }
                }
            }
        }
        catch(err) { console.log(err); }
    }
});

app.post('/recoverPassword/:email', async (req, res) => {
    const { email } = req.params;
    const { protocol } = req.body;

    try {
        const findUser = await knex('users')
        .select('*')
        .where({ Email: email })
        if(findUser[0] !== undefined) {
            let realUsername = findUser[0].Username;

            if(findUser[0].Username.includes(' ') === true) realUsername = realUsername.replaceAll(' ', '_');

            const mailOptions = {
                from: MAILUSER,
                to: 'deniscotecata@gmail.com',
                subject: `Password recovery for ${findUser[0].Username} - Food Application`,
                text: `Hello, ${findUser[0].Username}!\n\nYou have recieved this message because you wanted to recover your password.\nIn order to have a fully restored password you will have to click on this link: http://localhost:3000/resetpassword/${realUsername}\n\nBest wishes,\nFood Application Team.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.log(error);
                else console.log("Email sent at:" + info.envelope.to);
            });

            await knex('users')
            .update({ PasswordRecovery: 1 })
            .where({ 
                Username: findUser[0].Username, 
                Email:email, 
                IP: protocol
            })

            res.send({message: 'Found', row: findUser[0].ID});
        } else res.send({message: 'Not Found'});
    }
    catch(err) { console.log(err); }
});

app.post('/resetpassword/:name', async (req, res) => {
    const { name } = req.params;
    const { pass, recovery } = req.body;

    let realUsername = name;

    if(name.includes('_') === true) realUsername = realUsername.replaceAll('_', ' ');

    try {
        const user = await knex('users')
        .select('*')
        .where({
            ID: recovery,
            Username: realUsername,
            PasswordRecovery: 1
        })
        if(user[0] !== undefined) {
            bcrypt.hash(pass, saltRounds, (error, hash) => {
                if (error) { console.log(error); return; }
                knex('login')
                .update({ Hash: hash })
                .where({
                    ID: user[0].ID,
                    Email: user[0].Email
                })
                .then(async() => {
                    await knex('users')
                    .update({ PasswordRecovery: 0 })
                    .where({ Username: user[0].Username })
                    .then(() => {
                        const mailOptions = {
                            from: MAILUSER,
                            to: 'deniscotecata@gmail.com',
                            subject: `Password Successfully Restored for ${user[0].Username} - Food Application`,
                            text: `Hello, ${user[0].Username}!\n\nYou have fully recovered you password for your account.\nIf you ever have any questions or encounter any issues, feel free to contact us.\n\nBest wishes,\nFood Application Team.`
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) console.log(error);
                            else console.log("Email sent at:" + info.envelope.to);
                        });
                        res.send({message: 'Found'});
                    })
                });
            }); 
        } else { res.send({message: 'Not Found'}); }
    }
    catch(err) { console.log(err); }
});

app.get('/getUsername/:id', async (req, res) => {
    const { id } = req.params;
    const userID = auth(id);

    try {
        const user = await knex('users')
        .select('*')
        .where({ ID: userID })
        if(user[0] !== undefined) return res.send({message: 'Found', user: user[0]});
        else return res.send({message: 'Not Found', user: ''});
    } catch(err) { console.log(err); }
});

app.get('/getUserBookings/:name', async (req, res) => {
    const { name } = req.params;

    try{
        const bookings = await knex('bookings')
        .select('*')
        .where({ bookingFor: name })
        res.send(bookings);
    } catch(err) { console.log(err); }
});

app.post('/deletecomment/:text', async (req, res) => {
    const { text } = req.params;

    try {
        const comment = await knex('gallerycomments')
        .select('*')
        .where({ Comment: text })
        if(comment[0] !== undefined) {
            knex('gallerycomments')
            .delete()
            .where({ Comment: text })
            .then(console.log)
            res.send({ message: 'Comment deleted' });
        } else res.send({message: 'Comment does not exist.'});
    }       
    catch(err) { console.log(err); }
});

app.post('/editcomment/:text', async (req, res) => {
    const { text } = req.params;
    const { edit } = req.body;

    try {
        const comment = await knex('gallerycomments')
        .select('*')
        .where({ Comment: text })
        if(comment[0] !== undefined) {
            knex('gallerycomments')
            .update({ Comment: edit })
            .where({ Comment: text })
            .then(console.log)
            res.send({ message: 'Comment deleted' });
        } else res.send({message: 'Comment does not exist.'});
    }       
    catch(err) { console.log(err); }
});

app.post('/reportcomment/:text', async (req, res) => {
    const { text } = req.params;
    
    try {
        const comment = await knex('gallerycomments')
        .select('*')
        .where({ Comment: text })
        if(comment[0] !== undefined) {  
            const reported = await knex('reportedcomments')
            .select('*')
            .where({ CommentID: comment[0].ID })
            if(reported[0] === undefined) {
                knex('reportedcomments')
                .insert({
                    CommentID: comment[0].ID,
                    Username: comment[0].Username,
                    Comment: comment[0].Comment
                })
                .then(console.log);
                res.send({message: 'Comment reported'});
            } else res.send({message: 'Comment already reported'});
        } else res.send({message: 'Comment not found'});
    }
    catch(err) { console.log(err); }
});

app.post('/sendEmailFromContact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const mailOptions = {
            from: MAILUSER,
            to: `${email}`,
            subject: `Email contact confirmation for ${name} - Food Application`,
            text: `Hello, ${name}!\n\nThis is just a confirmation that we receieved your message and we will be in touch with you soon.\n\nBest wishes,\nFood Application Team.`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            else console.log("Email sent at:" + info.envelope.to);
        });

        const mailOptions2 = {
            from: `${email}`,
            to: MAILUSER,
            subject: `Message from ${name} - Food Application`,
            text: `${message}`
        };
    
        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) console.log(error);
            else console.log("Email sent at:" + info.envelope.to);
        });

        res.send({notif: 'Sent'});
    }
    catch(err) { console.log(err); }
});

app.get('/getusercart/:id', async (req, res) => {
    const { id } = req.params;
    const userID = auth(id);

    try {
        const user = await knex('usercart')
        .select('*')
        .where({ ForID: userID })
        if(user[0] !== undefined) {
            res.send({user: user[0]});
        } else return res.send({user: ''});
    } catch(err) { console.log(err); }
});

app.post('/addproducttocart/:id', async (req, res) => {
    const { id } = req.params;
    const { meal } = req.body;

    const userID = auth(id);

    try{
        if(userID !== 0) {
            const cart = await knex('usercart')
            .select('*')
            .where({ ForID: userID })
            if(cart[0] !== undefined) {
                let string;
                if(cart[0].Products === '') string = `${meal}`;
                else string = cart[0].Products+`,${meal}`;

                knex('usercart')
                .update({ Products: string, TotalPrice: 15.99 })
                .where({ ForID: userID })
                .then(() => { res.send({message: 'Cart updated'}); })
            } else res.send({message: 'Something is wrong'});
        } else res.send({message: 'Not found'});
    }
    catch(err) { console.log(err); }
});

app.post('/removeproductfromcart/:id', async (req, res) => {
    const { id } = req.params;
    const { meal } = req.body;

    const userID = auth(id);

    try {
        const cart = await knex('usercart')
        .select('*')
        .where({ ForID: userID })
        if(cart[0] !== undefined) {
            const array = cart[0].Products.split(',');
            const index = array.indexOf(meal);
            if (index > -1) { array.splice(index, 1); }
            
            knex('usercart')
            .update({ Products: array.toString() })
            .where({ ForID: userID })
            .then(() => { res.send({message: 'Cart updated'}); })
        } else res.send({message: 'Something is wrong'})
    }
    catch(err) { console.log(err); }
});

app.post('/updatecartprice/:id', async (req, res) => {
    const { id } = req.params;
    const { condition } = req.body;
    const userID = auth(id);

    try {
        if(condition === 'increase') {
            await knex('usercart')
            .increment('TotalPrice', 15.99)
            .where({ ForID: userID })
            res.send({message: 'Cart updated'});
        } else {
            await knex('usercart')
            .decrement('TotalPrice', 15.99)
            .where({ ForID: userID })
            res.send({message: 'Cart updated'});
        }

    }
    catch(err) { console.log(err); }
});

app.listen(PORT, async () => { 
    await knex('users')
    .select('ID')
    .then(() => console.log(`Database connected on port ${PORT}`))
    .catch(err => console.log(err));
});