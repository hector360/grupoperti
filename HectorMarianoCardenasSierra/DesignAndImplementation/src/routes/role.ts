import express, { Request, Response } from "express";
import { createRole, updateRole, getRoles, getRole, deleteRole } from '../controller/roleController';
import { validateRequest } from '../middlewares/validate-request';
import { validateUser } from '../middlewares/validate-user';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/roles/create-role', [
    body('name')
        .notEmpty()
        .withMessage('The "name" field must not be empty.'),
    body('description')
        .notEmpty()
        .withMessage('The "description" field must not be empty.'),
], validateRequest, createRole);

router.put('/api/roles/update-role/:roleId', [
    body('name')
        .notEmpty()
        .withMessage('The "name" field must not be empty.'),
    body('description')
        .notEmpty()
        .withMessage('The "description" field must not be empty.'),
], validateRequest, updateRole);

router.get('/api/roles/get-roles', validateUser, getRoles);
router.get('/api/roles/get-role/:roleId', validateUser, getRole);
router.delete('/api/roles/delete-role/:roleId', validateUser, deleteRole);

export { router as roleRouter }