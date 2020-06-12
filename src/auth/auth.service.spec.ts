import {Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

import { AuthService } from './auth.service';
import User from 'src/users/users.entity';



	class JwtServiceMock {
			sign(payload) {
					const string = "accessToken"
					return string
			}
	}

	class UsersServiceMock {

		getByEmail(email:string) {

			const user = {
				email:"mouse@gmail.com",
				name:"KingTiger",	}

				return user
		}
}


	
	describe('AuthService', () => {
			
			let module: TestingModule;
			let authService: AuthService;

			beforeEach(async () => {

			const JwtServiceProvider = {
					provide:JwtService,
					useClass:JwtServiceMock
			};

			const UsersServiceProvider = {
				provide:UsersService,
				useClass:UsersServiceMock
		};

			module = await Test.createTestingModule({
					providers: [
						AuthService,
						JwtServiceProvider,
						UsersServiceProvider,
					],
			}).compile();

			authService = module.get<AuthService>(AuthService);

			});

			describe('getAccessToken',() => {

					it('should get access token', async () => {

						const loginInfo :User = {
							email:"mouse@gmail.com",
							name:"KingTiger",
							password:"helloworld"
					}

							const expectedToken = {
								access_token:	"accessToken"
							};

							const token = await authService.login(loginInfo);

							expect(token).toEqual(expectedToken)
					})
			})


	});