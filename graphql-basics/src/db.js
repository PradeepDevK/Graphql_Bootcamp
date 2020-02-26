const users = [{
    id: '1',
    name: 'Pradeep',
    email: 'pradeep@example.com',
    age: 29
},
{
    id: '2',
    name: 'Raj',
    email: 'raj@example.com',
    age: 29
},
{
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}
]

//Demo post data
const posts = [{
    id: '1',
    title: "TestOne",
    body: 'Body OneA',
    published: true,
    author: '1'
},
{
    id: '2',
    title: "TestTwoc",
    body: 'Body Two',
    published: false,
    author: '1'
},
{
    id: '3',
    title: "TestFour",
    body: 'Body Fourc',
    published: true,
    author: '3'
}
]

//Demo comments data
const comments = [{
    id: '1',
    text: 'Testing One',
    author: '1',
    postId: '1'
}, {
    id: '2',
    text: 'Testing Two',
    author: '1',
    postId: '1'
}, {
    id: '3',
    text: 'Testing Three',
    author: '3',
    postId: '3'
}]

const db = {
    users,
    posts,
    comments
}

export {db as default}