import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditNavigation } from "../components/edit-navigation";

describe('EditNavigation', () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();
    const postId = 1;

    afterEach(() => {
        onEditMock.mockClear();
        onDeleteMock.mockClear();
    });

    test('renders edit and remove labels', () => {
        render(<EditNavigation postId={postId} onEdit={onEditMock} onDelete={onDeleteMock} />);

        const editPostElements = screen.getAllByText('Edit post');
        const removePostElements = screen.getAllByText('Remove post');

        expect(editPostElements.length).toBe(3); // Make sure there are two "Edit post" elements
        expect(removePostElements.length).toBe(1); // Make sure there is one "Remove post" element
    });

    test('calls onEdit with the correct postId when the edit button is clicked', () => {
        render(<EditNavigation postId={postId} onEdit={onEditMock} onDelete={onDeleteMock} />);

        const editButton = screen.getAllByText('Edit post')[0].parentElement;
        if (!editButton) {
            throw new Error('Edit button not found');
        }
        fireEvent.click(editButton);

        expect(onEditMock).toHaveBeenCalledWith(postId);
        expect(onEditMock).toHaveBeenCalledTimes(1);
    });
    //
    test('calls onDelete with the correct postId when the remove button is clicked', () => {
        render(<EditNavigation postId={postId} onEdit={onEditMock} onDelete={onDeleteMock} />);

        const deleteButton = screen.getByText('Remove post').parentElement;
        if (!deleteButton) {
            throw new Error('Delete button not found');
        }
        fireEvent.click(deleteButton);

        expect(onDeleteMock).toHaveBeenCalledWith(postId);
        expect(onDeleteMock).toHaveBeenCalledTimes(1);
    });
});
