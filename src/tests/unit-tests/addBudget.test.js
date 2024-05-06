import React from 'react';
import { render, screen } from '@testing-library/react';
import AddBudget from '../../components/AddBudget';

describe('AddBudget Component', () => {
  it('renders correctly', () => {
    render(<AddBudget />);
    expect(screen.getByText('Create New Budget')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Total Amount')).toBeInTheDocument();
  });
});
