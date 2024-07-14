import React, {memo, useCallback} from "react";
import profileImage from "../../backend/images/profile-image.png";
interface PostItem {
    postId: number;
    postTitle: string;
    postText: string;
    author: string;
    imageSrc: string | undefined;
    onEditOptions: (postId: number) => void;
    isExpanded: boolean;
    render: (postId: number) => React.ReactNode;
}
export const PostItem: React.FC<PostItem> = memo((
    {
        postId,
        imageSrc,
        onEditOptions,
        isExpanded,
        postTitle,
        postText,
        author,
        render,
    }: PostItem) => {
    const handleEditOptions = useCallback(() => {
        onEditOptions(postId);
    }, [postId, onEditOptions]);

    return (
        <div style={{ position: 'relative' }} className="cat-grid cat-grid-1 cat-gap-l">
            <cat-card
                class="cat-bg-secondaryInverted cat-p-xm cat-justify-between cat-flex cat-gap-y-l cat-border-dark cat-h5"
                style={{ borderRadius: '1rem' }}>
                <cat-card class="cat-bg-secondaryInverted cat-flex">
                    <img className="profile-image" src={profileImage as string} alt="profile" />
                    <p className="cat-p-m">{author}</p>
                </cat-card>
                <cat-icon
                    class="cat-flex cat-items-center"
                    icon="dots-circle-outlined"
                    onClick={handleEditOptions} // TODO: check why using cat events is not working
                />
            </cat-card>
            <p>{postTitle}</p>
            {imageSrc && <img className="post-image" style={{height: '20rem'}} src={imageSrc} alt="profile"/>}
            <p className={`post-content ${isExpanded && isExpanded[postId] === true ? 'expanded' : ''}`}>
                <cat-scrollable style={{maxHeight: '60rem', maxWidth: '30rem', minWidth: '20rem'}}>
                    {postText}
                </cat-scrollable>
            </p>
            {render(postId)}
        </div>
    )
})