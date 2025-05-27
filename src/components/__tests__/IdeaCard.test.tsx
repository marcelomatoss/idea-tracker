
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IdeaCard from '../IdeaCard';
import { type Idea } from '@/services/apiService';

const mockIdea: Idea = {
  id: '1',
  title: 'Test Idea',
  description: 'This is a test idea description',
  category: 'personal',
  tags: ['test', 'example'],
  createdAt: new Date('2024-01-01T10:00:00Z'),
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('IdeaCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders idea information correctly', () => {
    render(
      <IdeaCard 
        idea={mockIdea} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test Idea')).toBeInTheDocument();
    expect(screen.getByText('This is a test idea description')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
    expect(screen.getByText('personal')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <IdeaCard 
        idea={mockIdea} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockIdea);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <IdeaCard 
        idea={mockIdea} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('displays formatted date correctly', () => {
    render(
      <IdeaCard 
        idea={mockIdea} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    // Date should be formatted in Portuguese - looking for "01 de jan"
    expect(screen.getByText(/01 de jan/)).toBeInTheDocument();
  });

  it('applies correct category color class', () => {
    const { container } = render(
      <IdeaCard 
        idea={mockIdea} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const colorBar = container.querySelector('.bg-gradient-to-br.from-pink-500.to-rose-500');
    expect(colorBar).toBeInTheDocument();
  });
});
