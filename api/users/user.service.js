const mysqlConnection = require("../../connection");

module.exports = {
    create: (data, callBack) => {
        let date = new Date();
        mysqlConnection.query(
            `insert into registration(firstName, lastName, email, password, accountcreated) 
                values(?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                date
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getUserByUserEmail: (email, callBack) => {
        mysqlConnection.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    getUserByUserId: (id, callBack) => {
        mysqlConnection.query(
            `select id,firstName,lastName,email,accountcreated, accountupdated from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    getUsers: callBack => {
        mysqlConnection.query(
            `select id,firstName,lastName,email,accountcreated, accountupdated from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    updateUser: (data, callBack) => {
        let date = new Date();
        mysqlConnection.query(
            `update registration set firstName=?, lastName=?, password=?, accountupdated=? where email = ?`,
            [
                data.first_name,
                data.last_name,
                data.password,
                date,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};
