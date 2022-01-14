'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A first name is required.'
              },
              notEmpty: {
                msg: 'Please provide a first name.'   
              },  
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A last name is required.'
              },
              notEmpty: {
                msg: 'Please provide a last name.'   
              },  
            },
          },  
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: {
              msg: 'The email you entered already exists'  
            },
            validate: {
              notNull: {
                msg: 'An email is required.'
              },
              isEmail: {
                msg: 'Please provide a valid email address.'   
              }    
            },   
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A password is required'
              },
              notEmpty: {
                msg: 'Please provide a password.'   
              },
                   
            },
          },
          confirmedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
              if(val === this.password){
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue('confirmedPassword', hashedPassword);
              }
            },
            validate: {
              notNull: {
                msg: 'Both passwords must match'
              }
            }
          }






    }, { sequelize });

    return User;

};