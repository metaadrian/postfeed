import create from 'zustand';
import { Post} from "../../models";
interface PostStore {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
}
export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
}));
