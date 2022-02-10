const time = require('../js/time_util.js');

it('should output a time (hours and minutes)', () => {
    const t = time.convert_time('10022022T190200');
    expect(t).toBe('19h02');
});

it('should output a the actual time', () => {
    const t = time.getActualTime();
    expect(typeof t).toEqual('string');
    expect(t).toMatch(/T/);
});