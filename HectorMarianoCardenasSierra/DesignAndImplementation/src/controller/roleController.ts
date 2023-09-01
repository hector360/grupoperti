import { Request, Response } from "express";
import { Role } from '../models/roles';
import { BadRequestError } from '../errors/bad-request-error';

export const createRole = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    const existingRole = await Role.findOne({ name });

    if (existingRole) {
        throw new BadRequestError('Name in use')
    }

    const role = Role.build({ name, description });
    await role.save();


    res.status(200).json({
        id: role.id,
        name: role.name,
        description: role.description
    });
}

export const updateRole = async (req: Request, res: Response) => {
    const roleId = req.params.roleId;
    const { name, description } = req.body;

    const role = await Role.findOne({ _id: roleId });
    console.log("role")
    console.log(role)
    if (!role) {
        throw new BadRequestError('Role not found');
    }

    role.name = name;
    role.description = description;


    await role.save();

    res.status(200).json(role);

};

export const getRoles = async (req: Request, res: Response) => {

    const roles = await Role.find();

    if (!roles) {
        throw new BadRequestError('Role not found');
    }

    res.status(200).json(roles);


}

export const getRole = async (req: Request, res: Response) => {
    const roleId = req.params.roleId;

    const role = await Role.findOne({ _id: roleId });

    if (!role || null) {
        throw new BadRequestError('Role not found');
    }

    res.status(200).json(role);

};

export const deleteRole = async (req: Request, res: Response) => {
    const roleId = req.params.roleId;

    const role = await Role.findOne({_id: roleId});

    if (!role || null) {
        throw new BadRequestError('Role not found');
    }

    await Role.deleteOne({ _id: roleId });

    res.status(200).json({
        message: 'Role deleted successfully',
    });

}
