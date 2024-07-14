import {Post} from "../models";
import {useEffect, useState} from "react";
import process from "process";
export const usePostImages = (posts: Post[]) => {
    const [postImages, setPostImages] = useState<Record<number, string | undefined>>({});

    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = posts.map(async (post) => {
                try {
                    if (!post.profileImage) {
                        return [post.id, undefined];
                    }
                    // Construct the full URL using the public path
                    const imageUrl = `${process.env.PUBLIC_URL}/images/${post.profileImage}`;


                    return [post.id, imageUrl];

                } catch (error) {
                    console.error(`Error loading image --${post.profileImage}:`, error);
                }
            });

            const loadedImages = await Promise.all(imagePromises);
            setPostImages(Object.fromEntries(loadedImages));
        };

        loadImages();
    }, [posts]);

    return postImages;
};