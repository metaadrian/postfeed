import axios from 'axios';
import mock from "../api-mock";
import { Post } from "../../models";
import { describe, it, expect } from "@jest/globals";

describe('PUT /api/posts', () => {
    it('should post update successfully', async () => {
        const updatedPost: Post = {
            id: 1,
            title: 'Random Title',
            text: 'This is a random text',
            author: 'Mike Tyson',
            profileImage: 'doggy-dog.png',
        };

        mock.onPut('/api/posts').reply(200, updatedPost);

        const response = await axios.put('/api/posts', updatedPost);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(updatedPost);
    });
});
