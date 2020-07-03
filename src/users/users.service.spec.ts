import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import User from './users.entity';
import { Repository, Entity } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(entity => entity),
    addOne: jest.fn(entity => entity),
    // ...
  }),
);

describe('UserService', () => {
  let userService: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    userService = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should find a user', async () => {
    const user = { name: 'Alni', email: 'mouse@gmail.com' };
    const result = {
      email: 'mouse@gmail.com',
    };
    // Now you can control the return value of your mock's methods
    repositoryMock.findOne.mockReturnValue(user);

    expect(await userService.getByEmail(user.email)).toEqual(user);
    // console.log(await userService.getByEmail(user.email))

    // And make assertions on how often and with what params your mock's methods are called
    expect(repositoryMock.findOne).toHaveBeenCalledWith(result);
  });
});

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
