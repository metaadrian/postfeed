import axios  from "axios";
import MockAdapter from "axios-mock-adapter";
import { Post } from "../models";

const mock: MockAdapter = new MockAdapter(axios);

const postsData: Post[] = [
    {
        id: 1,
        title: "Doggy Dog Land",
        author: "Mikey Lee",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq ua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" ,
        profileImage: "doggy-dog.jpg"
    },
    {
        id: 2,
        title: "About cars",
        text: "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
        author: "Mikey Lee",
        profileImage: "nice-car.jpg",
    },
    {
        id: 3,
        title: "Mountain View",
        text: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
        author: "Mikey Lee",
        profileImage: "mountain.jpg"
    },
]

mock.onGet("/api/posts").reply(200, postsData);

mock.onPut('/api/posts').reply(config => {
    const updatedItem: Post = JSON.parse(config.data);
    // find the index of the post to be updated in postData array based on the id
    const index = postsData.findIndex(post => post.id === updatedItem.id);
    if (index !== -1) {
        // if post is found we update it with the new information and return a response with status 200
        postsData[index] = updatedItem;
        return [200, updatedItem];
    } else {
        // is post is not found we return a response with status 404
        return [404, { error: 'PostItem not found' }];
    }
});

// Todo: Recheck this, as I wanted to use this in the first instance but got a constant axios error
// mock.onDelete('/api/posts/:id').reply(config => {
//     console.log('request----')
//     const postId = parseInt(config.url.split('/').pop(), 10);
//     const postIndex = postsData.findIndex(post => post.id === postId);
//
//     if (postIndex !== -1) {
//         postsData.splice(postIndex, 1);
//         return [200]; // Indicate successful deletion
//     } else {
//         return [404, { error: 'PostItem not found' }];
//     }
// });

export default mock;