import express from "express";
import { body } from 'express-validator';
import { signup, signin, updateUser, getUsers, getUser, deleteUser } from '../controller/userController';
import { validateRequest } from '../middlewares/validate-request';
import { validateUser } from '../middlewares/validate-user';

const router = express.Router();

router.post('/api/users/signup', [
    body('name')
        .notEmpty()
        .withMessage('The "name" field must not be empty.'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid.'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters.'),
    body('roleId')
        .notEmpty()
        .withMessage('The "roleId" field must not be empty.')

], validateRequest, signup);
router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], validateRequest, signin);

router.put('/api/users/update-user/:userId', validateUser, updateUser);
router.get('/api/users/get-users', validateUser, getUsers);
router.get('/api/users/get-user/:userId', validateUser, getUser);
router.delete('/api/users/delete-user/:userId', validateUser, deleteUser);

export { router as userRouter}