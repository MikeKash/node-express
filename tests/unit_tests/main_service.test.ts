import mainService from '../../src/services/main.service';

test('mainService', () => {
  expect(mainService.getHelloWorld()).toBe('hello world');
});
