import uuidv3 from 'uuid'

const Mutation = {
    createUsers(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('Email Taken.')
        }

        let user = {
            id: uuidv3(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUsers(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found')
        }

        const deletedUsers = db.users.splice(userIndex, 1)

        posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                comments = db.comments.filter((comment) => comment.postId !== post.id)
            }

            return !match
        })

        comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    updateUsers(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error("Email taken")
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },
    createPosts(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) {
            throw new Error('User not found')
        }

        let post = {
            id: uuidv3(),
            ...args.data
        }

        db.posts.push(post)
        
        if (args.data.published) {
            pubsub.publish('post', {
                post : {
                    mutation: 'CREATED',
                    data: post
                }
            })
        }

        return post
    },
    deletePosts(parent, args, { db, pubsub }, info) {
        const postIndex = db.posts.findIndex((post) => post.id === args.id)

        if (postIndex === -1) {
            throw new Error('Post not found')
        }

        const [post] = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment) => comment.postId !== args.id)

        console.log(post)
        console.log(post.published)
        if (post.published) {
            pubsub.publish(`post`, {
                post: {
                    mutation: 'DELETED',
                    data: post
                }
            })
        }

        return post
    },
    updatePosts(parent, args, {db, pubsub }, info) {
        const {id, data } = args
        const post = db.posts.find((post) => post.id === id)

        const originalPost =  { ...post}

        if (!post) {
            throw new Error('Post not found')
        }

        if (typeof data.title === 'string') {
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published
            console.log(originalPost.published)
            console.log(post.published)
            if (originalPost.published && !post.published) {
                //deleted
                pubsub.publish(`post`, {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost
                    }
                })
            } else if (!originalPost.published && post.published) {
                //created
                pubsub.publish(`post`, {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            }
        } else if (post.published) {
            //updated
            pubsub.publish(`post`, {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }

        return post
    },
    createComments(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) {
            throw new Error('User not found')
        }

        const postExists = db.posts.some((post) => post.id === args.data.postId)

        if (!postExists) {
            throw new Error('Post not found')
        }

        let comment = {
            id: uuidv3(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.postId}`, { 
            comment : {
                mutation : "CREATED",
                data : comment
            }
        })

        return comment
    },
    deleteComments(parent, args, { db, pubsub }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const [deletedComment] = db.comments.splice(commentIndex, 1)

        pubsub.publish(`comment ${deletedComment.postId}`, {
            comment : {
                mutation : 'DELETED',
                data: deletedComment
            }
        })

        return deletedComment
    },
    updateComments(parent, args, { db, pubsub }, info) {
        const { id, data } = args
        const comment = db.comments.find((comment) => comment.id === id)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        }

        pubsub.publish(`comment ${comment.postId}`, {
            comment: {
                mutation: "UPDATED",
                data: comment
            }
        })

        return comment
    }
}

export { Mutation as  default }