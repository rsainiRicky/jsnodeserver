var url = require('url');
const {_tblUsers} = require ('../models');

module.exports = {
    async userGetAll (req, res) {
        try {
            if (req.query.id != "") {
                const userRecordset = await _tblUsers.findAll({where :  req.query  });
                appLogger.logger[logOption.toString()]('Response : ', userRecordset);
                res.status(200).send(userRecordset);

            }else {
                const userRecordset = await _tblUsers.findAll({}, { raw : true });
                appLogger.logger[logOption.toString()]('Response : ', userRecordset);
                res.status(200).send(userRecordset); 
            }
            } catch(err){
            appLogger.logger[logOption.toString()]('Error : ', err);
            res.status(400).send({"error" : err});
        }
    }
}