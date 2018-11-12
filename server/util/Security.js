
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Post, Tag } = require('../models');

class Security{
    static syncAuth(){
        //api handles jwt tokens in cookies and in headers, here they are syncetd
        return async function(req, res, next) {
            if (req.cookies['Authorization'] 
                && req.cookies['Authorization'].startsWith('Bearer')){
                req.headers['authorization']=req.cookies['Authorization']
            }
            if (req.get('Authorization')){
                var token = req.get('Authorization');
                res.cookie('Authorization',token, { maxAge: 900000, httpOnly: true })
                token=token.substring(7);
                var jwtInfo = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findOne({ where: { email: jwtInfo.email } })
                
            }
            else
                res.clearCookie('Authorization')
            next()
        }
    }

    static async login(email, password, res){
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('No user with that email');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Incorrect password');
        }
        var token = await jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1y' });
        res.cookie('Authorization','Bearer '+token, { maxAge: 900000, httpOnly: true})
        return token;
    }

    static async logout(res){
        res.clearCookie('Authorization')
        return "ok"
    }
}


export default Security;
 