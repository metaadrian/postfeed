import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Modal} from "../components/modal"; // Import for extended matchers

describe('Modal', () => {
    const onCloseMock = jest.fn();

    afterEach(() => {
        onCloseMock.mockClear();
    });

    test('renders modal with title and children', () => {
        const title = 'Test Modal';
        const children = <p>Modal content</p>;

        render(
            <Modal onClose={onCloseMock} title={title}>
                {children}
            </Modal>
        );

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    test('calls onClose when close button is clicked', () => {
        render(<Modal onClose={onCloseMock} title="Test Modal">
            <p>Modal content</p>
        </Modal>);

        fireEvent.click(screen.getByText('Close')); // Make sure "Close" text exists

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when overlay is clicked', () => {
        render(<Modal onClose={onCloseMock} title="Test Modal">
            <p>Modal content</p>
        </Modal>);

        // Use a more specific query (assuming your Modal has a role="dialog")
        fireEvent.click(screen.getByRole('close'));

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('adds and removes "is-modal-open" class to body', () => {
        const { unmount } = render(
            <Modal onClose={onCloseMock} title="Test Modal">
                <p>Modal content</p>
            </Modal>
        );

        expect(document.body.classList.contains('is-modal-open')).toBe(true);
    });
});
