"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSetup = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
class AuthSetup {
    static isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bearerHeader = req.headers.authorization;
            console.log(bearerHeader);
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];
                jwt.verify(bearerToken, env_1.getEnvironmentVariables().jwt_secret, // token secret
                (err, authdata) => {
                    console.log(authdata);
                    if (err) {
                        res.status(403).json({
                            status: 'error',
                            data: {},
                            error: 'user not logged in',
                            success: 'user logged in'
                        });
                    }
                    else
                        next();
                });
            }
            else {
                res.status(403).json({
                    status: 'error',
                    data: {},
                    error: 'user not logged in',
                    success: 'user logged in'
                });
            }
        });
    }
}
exports.AuthSetup = AuthSetup;
