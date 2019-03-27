import React from 'react';
import { App } from '../App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const props = {
    dispatch: jest.fn(),
    token: 'some token',
  };
  shallow(<App {...props} />);
});
