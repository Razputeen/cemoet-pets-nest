import { Role } from './../../roles/role.enum';
import { User } from '#/users/entities/user.entity';

export const userMasterData: User[] = [
  {
    id: '23131e76-ee28-407c-aed7-a5d573cb1cd3',
    Name: 'Hasta',
    email: 'Mako@example.com',
    password: '123',
    role: {
      id: 'd01937d9-0ef0-4c23-8f1d-467480139010', name: 'admin',
      users: []
    },
    phoneNum: '08123456789',
    reserveGroom: [],
    alamatPick: [],
    clinic: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    version: 1,
  },
];
