/* global describe, it, expect, document */
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';


describe('App', () => {
  it('passes tests', () => {
    expect(2 + 2).toBe(4);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
