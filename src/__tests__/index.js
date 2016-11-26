import { expect } from 'chai';
import path from 'path';
import Promise from 'bluebird';
import parse from '../index';

const fs = Promise.promisifyAll(require('fs'));

const { describe, it } = global;

const tests = [{
  filename: 'empty.html',
  assertions: {
    title: '',
    description: '',
    hasContent: false,
  },
}, {
  filename: 'old.html',
  assertions: {
    title: 'About Temperature',
    description: '',
    hasContent: true,
  },
  debug: true,
}, {
  filename: 'github.html',
  assertions: {
    title: 'GitHub - reactGo/reactGo: Your One-Stop solution for a full-stack universal Redux App!',
    description: 'reactGo - Your One-Stop solution for a full-stack universal Redux App!',
    hasContent: true,
  },
}, {
  filename: 'lemonde.html',
  assertions: {
    title: 'Fillon-Juppé, une politique, deux méthodes',
    description: 'Editorial. Le débat du deuxième tour de la primaire de la droite a confirmé les différences de méthode et de tempo entre les deux postulants à l’élection présidentielle',
    hasContent: true,
  },
}, {
  filename: 'medium.html',
  assertions: {
    title: 'I spent 3 months applying to jobs after a coding bootcamp. Here’s what I learned.',
    description: 'A less-talked about part of the bootcamper’s journey is what happens after you graduate — when you’re searching for that six-figure developer position. I completed Hack Reactor in July 2016 and took…',
    hasContent: true,
  },
}, {
  filename: 'stripe.html',
  assertions: {
    title: 'Stripe',
    description: 'Stripe is a suite of APIs that powers commerce for businesses of all sizes.',
    hasContent: true,
  },
}, {
  filename: 'washington.html',
  assertions: {
    title: 'Russian propaganda effort helped spread ‘fake news’ during election, experts say - The Washington Post',
    description: 'Researchers say sophisticated tools were used to boost Trump and undermine Clinton.',
    hasContent: true,
  },
}];

const samples = Object.freeze(tests.map(test => Object.assign({}, test, {
  proposition: parse(fs.readFileSync(path.join(__dirname, 'samples', test.filename), 'utf8'), test.debug),
})));

describe('Test Setup', () => {
  it('should read samples', () => {
    expect(samples.length).to.be.greaterThan(0);
  });
  samples.forEach((sample) => {
    it(`should read ${sample.filename}`, () => {
      expect(sample.proposition.length).to.be.not.equal(undefined);
    });
  });
});

describe('Test Retrieve titles', () => {
  samples.forEach((sample) => {
    it(`should retrieve ${sample.filename} title`, () => {
      expect(sample.proposition.title).to.be.equal(sample.assertions.title);
    });
  });
});

describe('Test Retrieve descriptions', () => {
  samples.forEach((sample) => {
    it(`should retrieve ${sample.filename} description`, () => {
      expect(sample.proposition.description).to.be.equal(sample.assertions.description);
    });
  });
});

describe('Test Retrieve content', () => {
  samples.forEach((sample) => {
    it(`should retrieve ${sample.filename} content`, () => {
      if (sample.assertions.hasContent) {
        expect(sample.proposition.content.length).to.be.greaterThan(0);
        console.log(`size of ${sample.filename} : ${sample.proposition.content.length}`);
      } else {
        expect(sample.proposition.content.length).to.be.equal(0);
      }
    });
  });
});
