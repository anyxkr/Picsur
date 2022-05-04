import { Injectable } from '@angular/core';
import {
    UserCreateRequest,
    UserCreateResponse,
    UserDeleteRequest,
    UserDeleteResponse,
    UserInfoRequest,
    UserInfoResponse,
    UserListRequest,
    UserListResponse,
    UserUpdateRequest,
    UserUpdateResponse
} from 'picsur-shared/dist/dto/api/user-manage.dto';
import { EUser } from 'picsur-shared/dist/entities/user.entity';
import { AsyncFailable, Open } from 'picsur-shared/dist/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserAdminService {
  constructor(private api: ApiService) {}

  public async getUser(id: string): AsyncFailable<EUser> {
    return await this.api.post(
      UserInfoRequest,
      UserInfoResponse,
      'api/user/info',
      { id }
    );
  }

  public async getUsers(count: number, page: number): AsyncFailable<EUser[]> {
    const result = await this.api.post(
      UserListRequest,
      UserListResponse,
      '/api/user/list',
      {
        count,
        page,
      }
    );

    return Open(result, 'users');
  }

  public async createUser(user: UserCreateRequest): AsyncFailable<EUser> {
    return await this.api.post(
      UserCreateRequest,
      UserCreateResponse,
      '/api/user/create',
      user
    );
  }

  public async updateUser(user: UserUpdateRequest): AsyncFailable<EUser> {
    return await this.api.post(
      UserUpdateRequest,
      UserUpdateResponse,
      '/api/user/update',
      user
    );
  }

  public async deleteUser(id: string): AsyncFailable<EUser> {
    return await this.api.post(
      UserDeleteRequest,
      UserDeleteResponse,
      '/api/user/delete',
      { id }
    );
  }
}
