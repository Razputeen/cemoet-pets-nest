// admin.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../../roles/roles.decorator';
import { RolesGuard } from '../../roles/roles.guard';
import { AuthGuard } from '../auth.guard';
import { Role } from '#/roles/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  @Get()
  @Roles(Role.Admin)
  getAdminStuff() {
    return { message: 'You are admin!' };
  }
}
