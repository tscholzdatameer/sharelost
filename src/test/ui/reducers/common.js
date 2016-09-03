import { expect } from 'chai';
import { TOGGLE_DRAWER } from '../../../ui/actions/common';
import { drawer } from '../../../ui/reducers/common';

describe('Reducers', () => {

  context('common', () => {

    context('with wrong action type', () => {
      it('should return untouched state', () => {
        const state = drawer({}, { type: 'DOESNT_MATCH' });

        expect(state).to.deep.equal({});
      });
    });

    context('with correct action type', () => {

      it('should return true if no state is given', () => {
        const state = drawer({}, { type: TOGGLE_DRAWER });

        expect(state).to.have.property('isOpen', true);
      });

      it('should return inversed state', () => {
        const state = drawer({ isOpen: true }, { type: TOGGLE_DRAWER });

        expect(state).to.have.property('isOpen', false);
      });

    });

  });
});

