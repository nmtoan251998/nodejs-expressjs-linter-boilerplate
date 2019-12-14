const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    ObjectId
} = require('mongodb');
const {
    formatISO
} = require('date-fns');

const APIError = require('../utils/APIError');
const {
    env,
    secretOrPrivateKey,
} = require('../../config/vars');


class User {
    /**
     * Create new User instance
     * @param {object} collection MongoDb users collection instance
     */
    constructor(collection) {
        this.collection = collection;

        /**
         * 
         * Creation
         * @method createUser Create new user
         * 
         *  
         * Modification:
         * @method updateUserByEmail Update user by user's email
         * 
         * 
         * Query:
         * @method getAllUsers Get all users
         * @method getUserByEmail Get user account by user's email
         * 
         * 
         * Deletion:
         * @method deleteAllUsers Delete all users
         * 
         * Ultilities
         * @method generateAccessToken Generate new Json web token
         * @method comparePassword Compare 2 password
         * @method isValidId Check if Id is instance of MongoDb
         */

        this.generateAccessToken = generateAccessToken;
        this.comparePassword = comparePassword;
        this.isValidId = isValidId;
    }

    /**
    *===================================================
    *=                Query functions                  =
    *=        Put all the query functions below        =
    *===================================================
    */

    /**
     * Create new user
     * @param {object}  User data
     * @param {string} .email 
     * @param {string} .username
     * @param {string} .password
     * 
     * @return {object} user
     * @return {string} user.email
     * @return {string} user.username
     * @return {string} user.password
     * @return {string} user._id MongoDb ObjectId
     * @return {Date} user.createdAt
     */
    async createUser({ email, username, password }) {
        try {
            // create a hook to hash user's password with bcrypt before saving to database
            const hashedPassword = await hashPassword(password);

            const newUser = await this.collection
                .insertOne({
                    email,
                    username,
                    password: hashedPassword,
                    createdAt: formatISO(new Date(), { format: 'basic' })
                });

            return newUser.ops[0];
        } catch (error) {
            throw new APIError({
                message: 'Error creating new user',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: [
                    {
                        field: 'createUser',
                        location: 'Users Collection',
                        message: '',
                    }
                ]
            });
        }
    }

    /**
    *==========================================================
    *=                Creation functions                      =
    *=        Put all the creation functions below            =
    *==========================================================
    */

    /**
     * Get all users
     * @return {object[]} All users
     */
    async getAllUsers() {
        try {
            const users = await this.collection.find().toArray();

            return users;
        } catch (error) {
            throw new APIError({
                message: 'Error getting user data',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: [
                    {
                        field: 'getAllUsers',
                        location: 'Users Collection',
                        message: '',
                    }
                ]
            });
        }
    }

    /**
     * Find user by user email
     * @param {string} email
     * @return {null|object|APIError}
     */
    async getUserByEmail(email) {
        try {
            const user = await this.collection.find(
                {
                    'email': { $eq: email },
                },
                {
                    limit: 1,
                    projection: {
                        '_id': 0,
                        'createdAt': 0,
                        'updatedAt': 0,
                    }
                }
            ).next();

            if (!user) {
                return user;
            }

            return { ...user };
        } catch (error) {
            throw new APIError({
                message: 'Error getting user by user email',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: [
                    {
                        field: 'getUserByEmail',
                        location: 'Users Collection',
                        message: '',
                    }
                ]
            });
        }
    }

    /**
    *============================================================
    *=                Modification functions                    =
    *=        Put all the modification functions below          =
    *============================================================
    */

    /**
     * Update user by user email
     * @param {string} email User email
     * @return {number} Number of updated users
     */
    async updateUserByEmail(email, data) {
        try {
            const hashedPassword = await hashPassword(data.password);
            const updatedUser = await this.collection.updateOne(
                {
                    'email': {
                        $eq: email
                    }
                },
                {
                    $set: {
                        email: data.email,
                        password: hashedPassword,
                        updatedAt: formatISO(
                            new Date(),
                            {
                                format: 'basic'
                            }
                        )
                    }
                }
            );

            return updatedUser.modifiedCount;
        } catch (error) {
            throw new APIError({
                message: 'Error updating user by user email',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: [
                    {
                        field: 'updateUserByEmail',
                        location: 'Users Collection',
                        message: '',
                    }
                ]
            });
        }
    }


    /**
    *=========================================================
    *=                Deletion functions                     =
    *=        Put all the deletion functions below       	  =
    *=========================================================
    */

    /**
     * Delete all users
     * @return {number} Number of deleted users
     */
    async deleteAllUsers() {
        try {
            const deletedCounter = await this.collection.deleteMany({});

            return deletedCounter.deletedCount;
        } catch (error) {
            throw new APIError({
                message: 'Error deleting user data',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: [
                    {
                        field: 'deleteAllUsers',
                        location: 'Users Collection',
                        message: '',
                    }
                ]
            });
        }
    }


}


/**
*========================================================
*=                Ultilities functions                  =
*=        Put all the ultilities functions below        =
*========================================================
*/


/**
 * Generate an access token using Json web token
 * @param {*} payload Payloaded data
 * @return {string} token Payloaded Json web token
 */
async function generateAccessToken(payload) {
    try {
        const token = await jwt.sign(
            {
                payload: payload,
                exp: Math.floor(Date.now() / 1000 + parseInt(secretOrPrivateKey.expiration)) // token expire in 10h
            },
            secretOrPrivateKey.value
        );

        return token;
    } catch (error) {
        throw new APIError({
            message: 'Error generating access token',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false
        });
    }
}

/**
 * Hash user password
 * @param {string} password Raw text password
 * @return {string} hashed password
 */
async function hashPassword(password) {
    let saltRounds = 10;

    if (env === 'test') {
        saltRounds = 1;
    }

    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new APIError({
            message: 'Error hashing user password',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false
        });
    }
}

/**
 * Check if the id or valid or not
 * @param {ObjectId} id 
 * @return {boolean}
 */
isValidId = function (id) {
    if (ObjectId.isValid(id)) {
        return true;
    }

    return false;
};

/**
 * Compare password
 * @param {string} candidatePassword
 * @param {string} hashedPassword
 * @return {boolean}
 */
comparePassword = async function (candidatePassword, hashedPassword) {
    try {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
        throw new APIError({
            message: 'Error comparing passwords',
            status: httpStatus.INTERNAL_SERVER_ERROR,
            stack: error.stack,
            isPublic: false,
        });
    }
};

module.exports = User;
