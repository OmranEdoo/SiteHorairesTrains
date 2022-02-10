const term = require('../js/terminus_schedules2_util.js');

it('should output a string of the result that will be display after the search', () => {
    const res = term.buildInfos('Montargis (Montargis)', 'TER', [{date_time:'10022022T190200'}, {date_time:'10022022T190520'}]);
    expect(res).toBe('BERCY > Montargis (Montargis) <b class="num TER"></b><img src="" alt="" class="picto TER"><p>   Prochain train: 19h02</p><p>  Suivant: 19h05</p>');
});