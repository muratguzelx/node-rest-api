const request = require('supertest')
const app = require('../server')

describe('/POST', () => {

  beforeAll((done) => {
    app.on('ready', function () {   // wait for DB connection to be completed.
      done();
    });
  });

  it('it should return errors', async (done) => {
    const res = await request(app)
      .post('/')
      .send({
        startDate: "2016-01-26",  // endDate is missing
        maxCount: 'maxMax',  // maxCount must be numeric, minCount is missing.
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('endDate');
    expect(res.body.errors).toHaveProperty('minCount');
    expect(res.body.errors).toHaveProperty('maxCount');
    expect(res.body.errors.endDate).toBe('endDate is required');
    expect(res.body.errors.minCount).toBe('minCount is required');
    expect(res.body.errors.maxCount).toBe('maxCount must be numeric');
    done();
  });

  it('it should return successful request', async (done) => {
    jest.setTimeout(10000);
    const res = await request(app)
      .post('/')
      .send({
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": "2700",
        "maxCount": "3000"
      });
    expect(res.statusCode).toEqual(200, done);
    expect(res.body.code).toBe(0);
    expect(res.body.msg).toBe("Success");
    expect(res.body).toHaveProperty('records') // should return the records.
    done();
  });

})
