"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var execute_filter_1 = require("./execute_filter");
it('ranks strings well', function () {
    expect((0, execute_filter_1.rankStringMatch)('Fireball', 'firewall')).toBeLessThan((0, execute_filter_1.rankStringMatch)('Fire Your Boss', 'firewall'));
    expect((0, execute_filter_1.rankStringMatch)('Fireball', 'fireball')).toBeLessThan((0, execute_filter_1.rankStringMatch)('Fireball', 'firewall'));
});
//# sourceMappingURL=execute_filter.test.js.map