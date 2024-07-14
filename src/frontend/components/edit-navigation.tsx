import React, { memo, useCallback, useMemo, CSSProperties } from 'react';
interface EditNavigationProps {
    postId: number;
    onEdit: (postId: number) => void;
    onDelete: (postId: number) => void;
}
export const EditNavigation: React.FC<EditNavigationProps> = memo(({ postId, onEdit, onDelete }: EditNavigationProps) => {
    const handleEdit = useCallback(() => {
        onEdit(postId);
    }, [postId, onEdit]);

    const handleDelete = useCallback(() => {
        onDelete(postId);
    }, [postId, onDelete]);

    return (
        <div className="edit-navigation">
            <cat-card
                className="cat flex cat-items-center cat-justify-between"
            >
                <cat-card
                    className="cat-bg-secondary cat-flex cat-items-center cat-justify-center"
                    onClick={handleEdit}
                >
                    <cat-icon icon="pen-outlined">Edit post</cat-icon>
                    <label>Edit post</label>
                </cat-card>
                <cat-card
                    className="cat-bg-secondary cat-flex cat-items-center cat-justify-center"
                    onClick={handleDelete}
                >
                    <cat-icon icon="pen-outlined">Edit post</cat-icon>
                    <label>Remove post</label>
                </cat-card>
            </cat-card>
        </div>
    );
});
