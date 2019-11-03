import React from 'react';
import TestRenderer from 'react-test-renderer';
import Routes from './index';

it('renders without crashing', () => {
  const wrapper = TestRenderer.create(<Routes />);
  expect(wrapper).toMatchSnapshot();
});
