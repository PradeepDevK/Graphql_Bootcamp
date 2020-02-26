const Query = {
    users(parent, args, { db, prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)

        // if (!args.query) {
        //     return db.users
        // }
        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    posts(parent, args, { db, prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }

        return prisma.query.posts(opArgs, info)

        // if (!args.query) {
        //     return db.posts
        // }
        // return db.posts.filter((post) => {
        //     return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    comments(parent, args, { db, prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                text_contains: args.query
            }
        }

        return prisma.query.comments(opArgs, info)
        // return db.comments
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