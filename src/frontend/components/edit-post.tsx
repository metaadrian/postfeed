import React, { memo, useCallback, useRef, useState} from 'react';
import { Modal } from "./modal";
import { usePostStore } from "../store/store";
import { Post } from "../../models";
import axios from "axios";
import { usePostImages } from "../hooks";
export interface IsEditPostModel {
    [id: number]: boolean;
}
interface EditPostProps {
    isEdit: IsEditPostModel | boolean;
    onModalClose: () => void;
}
enum TextAreaId {
    Title = 'postTitle',
    Text = 'postText',
}
export const EditPost: React.FC<EditPostProps> = memo(({ isEdit, onModalClose }) => {
    const posts = usePostStore((state) => state.posts);
    const setPosts = usePostStore((state) => state.setPosts);
    const editPostId = Object.keys(isEdit).length ? Object.keys(isEdit)[0] : null;
    const post: Post = posts.find(post => post.id == editPostId);
    const postText = post ? post.text : '';
    const postTitle = post ? post.title : '';
    const [updatePostTitle, setUpdatePostTitle] = useState<string>(postTitle);
    const [updatePostText, setUpdatePostText] = useState<string>(postText);
    const formRef = useRef<HTMLDivElement | null>(null);
    const profileImages = usePostImages(posts);
    const handleUpdatePost = async () => {
        const updatedPost: Post = {
            // not yet implement uploading profile image
            ...post,
            title: updatePostTitle,
            text: updatePostText
        };

        try {
            // we simulate an axios PUT request to update the post
            const response = await axios.put(`/api/posts`, updatedPost);
            const updatedPostData = response.data;
            setPosts(posts.map(post => post.id === updatedPostData.id ? updatedPostData : post));
            onModalClose();
        } catch (error) {
            console.error('Error updating post:', error);
            onModalClose();
        }
    };

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (formRef.current instanceof HTMLDivElement) {
            const { id, value } = event.target as HTMLTextAreaElement;
            if (id === TextAreaId.Title) {
                setUpdatePostTitle(value);
            } else if (id === TextAreaId.Text) {
                setUpdatePostText(value);
            }
        }
    }, []);

    const handleModalClose = useCallback(() => {
        onModalClose();
    }, []);

    const profileImageSrc: string | undefined = profileImages[post.id];

    // TODO edit textarea's should be replaced with a cat-textarea component if onchange gets to work as expected
    return (
        <Modal title="Edit Post" onClose={handleModalClose}>
            <cat-scrollable style={{ maxHeight: "40rem", maxWidth: '30rem', minWidth: '20rem' }}>
                <div className="cat-grid cat-gap-y-l" ref={formRef} onChange={handleInputChange as any}>

                    <textarea
                        id={TextAreaId.Title}
                        rows="6"
                        cols="10"
                        value={updatePostTitle}
                        placeholder="Enter your title…"
                    />
                    <div>
                        {profileImageSrc && <img style={{height: '20rem'}} src={profileImageSrc} alt="profile"/>}
                    </div>
                    <textarea
                        style={{ height: '12rem' }}
                        id={TextAreaId.Text}
                        rows="6"
                        cols="10"
                        value={updatePostText}
                        placeholder="Enter your text…"
                    />

                    <button onClick={handleUpdatePost}>Save</button>
                </div>
            </cat-scrollable>
        </Modal>
    );
});
