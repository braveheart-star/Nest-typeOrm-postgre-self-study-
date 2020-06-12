import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service'
import { async } from 'rxjs/internal/scheduler/async';

describe('People Controller', () => {
  let peopleController: PeopleController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers:[PeopleService],
    }).compile();

    peopleController = module.get<PeopleController>(PeopleController);
    peopleService = module.get<PeopleService>(PeopleService);

  });

  describe('findAll',() => {
    it('should return array of people', async () => {
      const result: any =[
       { id: 2,
       name: "GuangGun",
        sex : false}
      ];

      jest.spyOn(peopleService, 'getPeople').mockImplementation(() => result);
      expect(await peopleController.getPeople()).toBe(result);

    });


  })


});
