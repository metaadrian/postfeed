import React, {FC, useState, useEffect, useCallback, memo, useMemo, Suspense} from 'react';
import axios from 'axios';
import { Post} from '../../models';
import { usePostStore } from '../store/store';
import { IsEditPostModel } from './edit-post';
import { usePostImages } from '../hooks';
import { PostItem } from './post-item';

const LazyEditNavigation = React.lazy(() => import('./edit-navigation').then(module => ({default: module.EditNavigation})));
const LazyEditPost = React.lazy(() => import('./edit-post').then(module => ({default: module.EditPost})));
export const Posts: FC<{}> = memo(() => {
    const setPosts = usePostStore(state => state.setPosts);
    const posts = usePostStore(state => state.posts);
    const [openPostActions, setPostActions] = useState<PostItem | boolean>(false);
    const [isEdit, setIsEdit] = useState<IsEditPostModel | boolean>(false);
    const [isModalClosed, setIsModalClosed] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<PostItem | boolean>(false);

    const profileImages = usePostImages(posts);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<Post[]>('/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [setPosts]);

    const expandPostContent = useCallback((id: number) => {
        setIsExpanded(prev => ({...prev, [id]: true}));
    }, []);

    const handleEditOptions = useCallback((id: number) => {
        setPostActions(prev => ({...prev, [id]: true}));
    }, []);

    const handleSetEditPost = useCallback((id: number) => {
        setIsEdit(prev => ({[id]: true}));
        setPostActions(prev => ({[id]: false}));
        setIsModalClosed(false);
    }, []);

    const handleDeletePost = async (postId: number) => {
        try {
            const newPosts = posts.filter(p => p.id !== postId);
            setPosts(newPosts);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleModalClose = useCallback(() => {
        setIsModalClosed(true);
    }, []);


    const editPostId = useMemo((): number | null => {
        return Object.keys(isEdit).length ? Number(Object.keys(isEdit)[0]) : null;
    }, [isEdit]);

    if (posts.length === 0) {
        return (
            <div
                className="posts-container" style={{position: 'relative'}}>
                <cat-scrollable style={{maxHeight: '60rem', maxWidth: '30rem', minWidth: '20rem'}}>
                    No posts found
                </cat-scrollable>
            </div>
        )
    }

    return (
        <div className="posts-container" style={{position: 'relative'}}>
            <div>
                <cat-scrollable style={{maxHeight: '60rem', maxWidth: '30rem', minWidth: '20rem'}}>
                    {posts.map((post: Post, index: number) => {
                        const profileImageSrc: string | undefined = profileImages[post.id];
                        return (
                            <PostItem
                                key={index}
                                postId={post.id}
                                imageSrc={profileImageSrc}
                                onEditOptions={handleEditOptions}
                                isExpanded={isExpanded[post.id]}
                                postTitle={post.title}
                                postText={post.text}
                                author={post.author}
                                render={(postId) => (
                                    <>
                                        {!isExpanded[postId] && (
                                            <span
                                                className="read-more"
                                                onClick={() => expandPostContent(postId)}
                                            >
                                                Read more
                                            </span>
                                        )}
                                        {openPostActions[postId] && (
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <LazyEditNavigation
                                                    postId={postId}
                                                    onEdit={handleSetEditPost}
                                                    onDelete={() => handleDeletePost(postId)}
                                                />
                                            </Suspense>
                                        )}
                                    </>
                                )}
                            />
                        );
                    })}
                </cat-scrollable>
            </div>
            {!!Object.keys(isEdit).length && !isModalClosed && <Suspense fallback={<div>Loading...</div>}>
                {isEdit && (
                    <LazyEditPost
                        postId={editPostId!}
                        isEdit={isEdit}
                        isModalClosed={isModalClosed}
                        onModalClose={handleModalClose}
                    />
                )}
            </Suspense>}

        </div>
    );
});
