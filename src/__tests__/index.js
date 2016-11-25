import { expect } from 'chai';
import path from 'path';
import Promise from 'bluebird';

const fs = Promise.promisifyAll(require('fs'));

const { describe, it } = global;

const tests = [{
  filename: 'github.html',
}, {
  filename: 'lemonde.html',
}, {
  filename: 'medium.html',
}, {
  filename: 'stripe.html',
}, {
  filename: 'washington.html',
}];

const samples = Object.freeze(tests.map(test => Object.assign({}, test, {
  html: fs.readFileSync(path.join(__dirname, 'samples', test.filename), 'utf8'),
})));

describe('Test Setup', () => {
  it('should read samples', () => {
    expect(samples.length).to.be.greaterThan(0);
  });
  samples.forEach((sample) => {
    it(`should read ${sample.filename}`, () => {
      expect(sample.html.length).to.be.greaterThan(0);
    });
  });
});
