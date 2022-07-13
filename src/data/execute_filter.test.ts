import {rankStringMatch} from './execute_filter';

it('ranks strings well', () => {
  expect(rankStringMatch('Fireball', 'firewall')).toBeLessThan(rankStringMatch('Fire Your Boss', 'firewall'));
  expect(rankStringMatch('Fireball', 'fireball')).toBeLessThan(rankStringMatch('Fireball', 'firewall'));
});
