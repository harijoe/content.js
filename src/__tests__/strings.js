import { expect } from 'chai';
import strings from '../strings';


const { describe, it } = global;

describe('Strings — Test params', () => {
  it('should ignore null candidates', () => {
    expect(strings([null, 'hello'])).to.be.equal('hello');
  });
  it('should ignore undefined candidates', () => {
    expect(strings([undefined, 'hello'])).to.be.equal('hello');
  });
  it('should ignore empty candidates', () => {
    expect(strings(['', 'hello'])).to.be.equal('hello');
  });
  it('should return empty string if no param is acceptable', () => {
    expect(strings([undefined, ''])).to.be.equal('');
    expect(strings([])).to.be.equal('');
  });
});

describe('Strings — Test voter', () => {
  it('should find the most accurate candidate', () => {
    expect(strings(['hello world', 'hello', 'long inappropriate string', ''])).to.be.equal('hello');
  });
});
