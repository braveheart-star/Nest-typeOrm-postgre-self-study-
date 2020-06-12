import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { async } from 'rxjs/internal/scheduler/async';

const user:any = {
  email:"mouse@gmail.com",
  password:"youcandobetter"
}
describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);

  });

    describe('login', () => {
      it('should return an access token', async () => {

        const result: any = {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IktpbmdUaWdlciIsInN1YiI6MSwiaWF0IjoxNTkxOTYzMzcyLCJleHAiOjE1OTE5NjM0MzJ9.9o_nPAHatXuV7QL_e_btCg68lgVYL6mYMr7od1ZeNjc"
        }

        // jest.spyOn(authService, 'login').mockImplementation(() => result);

        expect(await authController.logIn(user)).toBe(result)


      })
    })

});