import { expect } from 'chai';
import * as ItemActions from '../../../ui/actions/items';
import * as ItemReducers from '../../../ui/reducers/items';

describe('Reducers', () => {

  context('items', () => {

    context('allItems', () => {

      context('with wrong action type', () => {

        it('should return untouched state', () => {
          const state = ItemReducers.allItems({}, { type: 'WORNG_ACTION' });

          expect(state).to.deep.equal({});
        });

      });

      context('with correct action type', () => {

        it('should set fetching to true if it is requesting', () => {
          const state = ItemReducers.allItems({}, { type: ItemActions.REQUEST_ITEMS });

          expect(state).to.have.property('isFetching', true);
        });

        it('should not change items if it is requesting', () => {
          const items = [1];
          const state = ItemReducers.allItems({ items }, { type: ItemActions.REQUEST_ITEMS });

          expect(state).to.have.property('items').to.be.equal(items);
        });

        it('should set fetching to false if items are received', () => {
          const state = ItemReducers.allItems({ isFetching: true }, { type: ItemActions.RECEIVE_ITEMS });

          expect(state).to.have.property('isFetching', false);
        });
      });

    });

  });

});
