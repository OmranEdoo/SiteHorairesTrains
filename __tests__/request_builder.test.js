const request = require('../js/request_builder_util.js');

it('should modify a key to a suitable format', () => {
    const new_key = request.modifyKeyPath('ceci[]est[]un[]test[]');
    expect(new_key).toBe('ceci%5B%5Dest%5B%5Dun%5B%5Dtest%5B%5D');
});

it('should modify a value to a suitable format', () => {
    const new_value = request.modifyValuePath('ceci:est;un:test;');
    expect(new_value).toBe('ceci%3Aest%3Bun%3Atest%3B');
});