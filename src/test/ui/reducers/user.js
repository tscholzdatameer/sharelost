import { expect } from 'chai';
import {
  REQUEST_REGISTRATION,
  RECEIVE_REGISTRATION,
  REQUEST_TOKEN,
  RECEIVE_TOKEN
} from '../../../ui/actions/user';
import { auth } from '../../../ui/reducers/user';

describe('Reducers', () => {
  context('user', () => {
    context('with wrong action type', () => {

      it('should return untouched state', () => {
        const state = auth({}, { type: 'UNKONW_ACTION' });

        expect(state).to.deep.equal({});
      });

    });

    context('with correct action type', () => {

      context('REQUEST_REGISTRATION', () => {

        it('should return untouched state', () => {
          const state = auth({}, { type: REQUEST_REGISTRATION });

          expect(state).to.deep.equal({});
        });

      });

      context('RECEIVE_REGISTRATION', () => {

        it('should return untouched state', () => {
          const state = auth({}, { type: RECEIVE_REGISTRATION });

          expect(state).to.deep.equal({});
        });

      });

      context('REQUEST_TOKEN', () => {

        it('should return untouched state', () => {
          const state = auth({}, { type: REQUEST_TOKEN });

          expect(state).to.deep.equal({});
        });

      });

      context('RECEIVE_TOKEN', () => {

        it('should return default state', () => {
          const state = auth({}, { type: RECEIVE_TOKEN });

          expect(state).to.have.property('token', void 0);
          expect(state).to.have.property('authenticated', true);
          expect(state).to.have.property('timestamp');
          expect(state).to.have.property('user', void 0);
        });

        it('should update state', () => {
          const user = {};
          const timestamp = new Date().getTime();
          const state = auth({}, { type: RECEIVE_TOKEN, token: 'TOKEN', user });

          expect(state).to.have.property('token', 'TOKEN');
          expect(state).to.have.property('authenticated', true);
          expect(state).to.have.property('timestamp').to.be.at.least(timestamp);
          expect(state).to.have.property('user', user);
        });

      });

    });
  });
});
