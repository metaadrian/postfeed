// Mock the GET request and test the method
import axios from 'axios';
import mock from "../api-mock";
import { Post } from "../../models";
import { describe, it, expect } from "@jest/globals";

describe('GET /api/posts', () => {
    it('should return a list of posts successfully', async () => {
        const expectedPosts: Post[] = [
            {
                id: 1,
                title: 'Random Title',
                text: 'This is a random text',
                author: 'Mike Tyson',
                profileImage: 'profile.jpg',
            },
        ];
        mock.onGet('/api/posts').reply(200, expectedPosts);

        const response = await axios.get('/api/posts');

        expect(response.status).toBe(200);
        expect(response.data).toEqual(expectedPosts);
    });
});
