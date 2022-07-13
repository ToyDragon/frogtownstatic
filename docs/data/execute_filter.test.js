"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var execute_filter_1 = require("./execute_filter");
it('ranks strings well', function () {
    expect(execute_filter_1.rankStringMatch('Fireball', 'firewall')).toBeLessThan(execute_filter_1.rankStringMatch('Fire Your Boss', 'firewall'));
    expect(execute_filter_1.rankStringMatch('Fireball', 'fireball')).toBeLessThan(execute_filter_1.rankStringMatch('Fireball', 'firewall'));
});
//# sourceMappingURL=execute_filter.test.js.map