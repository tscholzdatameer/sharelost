import { expect } from 'chai';
import { toggleDrawer, TOGGLE_DRAWER } from '../../../ui/actions/common';

describe('Actions', () => {

  context('common', () => {

    it('should return a function', () => {
      const action = toggleDrawer();

      expect(action).to.be.a.func;
    });

    it('should call `dispatch`', () => {
      const action = toggleDrawer();

      action((state) => expect(state).to.be.an('object'));
    });

    it('should dispatch with correct type', () => {
      const action = toggleDrawer();

      action((state) => expect(state).to.have.property('type', TOGGLE_DRAWER));
    });

  });
});

