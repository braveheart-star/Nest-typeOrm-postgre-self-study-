import { Test, TestingModule } from '@nestjs/testing';
import {UsersService} from './users.service'
import User  from './users.entity'
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    // ...
  }));

  describe('UserService', () => {
    let service: UsersService;
    let repositoryMock: MockType<Repository<User>>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            UsersService,
          // Provide your mock instead of the actual repository
          { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
        ],
      }).compile();
      service = module.get<UsersService>(UsersService);
      repositoryMock = module.get(getRepositoryToken(User));
    });
  
    it('should find a user', async () => {
        const user = {name: 'Alni', id: '123'};
        // Now you can control the return value of your mock's methods
        repositoryMock.findOne.mockReturnValue(user);

        expect(await service.findUser(user.id)).toEqual(user);


        // And make assertions on how often and with what params your mock's methods are called
        expect(repositoryMock.findOne).toHaveBeenCalledWith(user.id);
      });




  });

  export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
  };