import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { Role } from '../models/roles';
import { Password } from '../service/password';
import { BadRequestError } from '../errors/bad-request-error';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password, roleId } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email is in use')
    }

    const roleExists = await Role.findOne({ _id: roleId });

    if (!roleExists) {
        throw new BadRequestError('The role doesn´t exists')
    }
    const user = User.build({ name, email, password, roleId });
    await user.save();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_KEY!
    );

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        token: userJwt
    });
}

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid email')
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid password')
    }

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },
        process.env.JWT_KEY!
    );


    res.status(200).json({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        roleId: existingUser.roleId,
        token: userJwt
    });
}

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { name, roleId } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new BadRequestError('User not found');
    }

    const roleExists = await Role.findOne({ _id: roleId });

    if (!roleExists) {
        throw new BadRequestError('The role doesn´t exists')
    }

    user.name = name;
    user.roleId = roleId;

    await user.save();

    res.status(200).json(user);

}

export const getUsers = async (req: Request, res: Response) => {

    const user = await User.find();

    if (!user) {
        throw new BadRequestError('Users not found');
    }

    res.status(200).json(user);

}

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const user = await User.findOne({ _id: userId });

    if (!user || null) {
        throw new BadRequestError('User not found');
    }

    res.status(200).json(user);

};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const user = await User.findOne({_id: userId});

    if (!user || null) {
        throw new BadRequestError('User not found');
    }

    await User.deleteOne({ _id: userId });

    res.status(200).json({
        message: 'User deleted successfully',
    });

}
