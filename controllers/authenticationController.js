const {_tblUsers} = require ('../models');

module.exports = { 
    async userRegister (req, res) {
        console.log(req.body);
        try {
            const user = await _tblUsers.create(req.body);
            console.log("Records :", user);
            //  At present Logging password - need to remove password logging
            appLogger.logger[logOption.toString()]("Response : ", user.toJSON());
            res.send(user.toJSON());
        } catch(err){
            appLogger.logger[logOption.toString()]("Error : ", err);
            res.status(400).send({"error" : "Email Exists"});
        }
    }
}   