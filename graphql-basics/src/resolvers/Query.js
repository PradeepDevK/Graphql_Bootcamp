const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter((post) => {
            return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments
    },
    me() {
        return {
            id: 12345,
            name: 'Pradeep',
            email: 'pradeep123@gmail.com'
        }
    },
    testPosts() {
        return {
            id: 'abc123',
            title: 'Test book',
            body: 'Test GraphQL',
            published: '2000'
        }
    }
}

export { Query as default}