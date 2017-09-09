import * as sinon from 'sinon';
import { expect } from 'chai';
import { Timer } from '../src/Timer';

describe('Timer', () => {
    let clock = null;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    })

    after(() => {
        clock.restore();
    })

    it('can register a callback', () => {
        const t = new Timer();
        const cb = sinon.stub();
        t.register('1', cb, 1000);
        expect(t.isPending('1')).to.be.true;
        clock.tick(500);
        expect(t.isPending('1')).to.be.true;
        clock.tick(501);
        expect(t.isPending('1')).to.be.false;
        expect(cb.callCount).to.equal(1);
    });

    it('can cancel a callback', () => {
        const t = new Timer();
        const cb = sinon.stub();
        t.register('1', cb, 1000);
        expect(t.isPending('1')).to.be.true;
        clock.tick(500);
        t.cancel('1');
        expect(t.isPending('1')).to.be.false;
        clock.tick(501);
        expect(cb.callCount).to.equal(0);
    });
});
