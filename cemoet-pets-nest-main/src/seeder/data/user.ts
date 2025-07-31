import { Role } from './../../roles/role.enum';
import { User } from '#/users/entities/user.entity';

export const userMasterData: User[] = [
  {
    id: '23131e76-ee28-407c-aed7-a5d573cb1cd3',
    Name: 'Hasta',
    email: 'Mako@example.com',
    password: '123',
    role: {
      id: '085bc84f-e13a-467f-9eb7-0f521329cc2a', name: 'admin',
      users: []
    },
    reserveGroom: [],
    alamatPick: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    version: 1,
  },
];
