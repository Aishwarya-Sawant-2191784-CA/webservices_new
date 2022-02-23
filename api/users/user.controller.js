const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
var dateTime = require('node-datetime');


// made database connection and create user
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                const body = req.body;
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                create(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection errror"
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            data: results
                        });
                    }
                })
            }
            else {
                return res.json({
                    success: 0,
                    data: "Email ID Already In Use"
                });
            }
        })
    },



 // login

    login: (req, res, next) => {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated')

            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401
            next(err)
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':')
        var username = auth[0]
        var password = auth[1]

        getUserByUserEmail(username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(password, results.password);
            if (result) {
                results.password = undefined;
                var dt = dateTime.create();
                var formatted = dt.format('Y-m-d H:M:S');
                console.log(formatted);
                return res.json({
                    success: 1,
                    message: "login successfully",
                    LoggedInAt: formatted
                });
                next();
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
                next(err);
            }
        });
    },



  //getting user by id
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
    },


  //getting all users
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
    },


  //updating user

    updateUsers: (req, res) => {
        var authHeader = req.headers.authorization;
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':')
        var username = auth[0]
        const body = req.body;
        if (body.email === username) {
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            updateUser(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.json({
                    success: 1,
                    message: "updated successfully"
                });
            });
        }
        return res.json({
            success: 0,
            message: "updatation not allowed"
        });
    },
};
