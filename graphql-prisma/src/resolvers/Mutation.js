import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';

// const token = jwt.sign({ id : 46}, 'mysecret');
// console.log('token ', token);

// const decoded = jwt.decode(token);
// console.log('decoded ', decoded);

// const decoded2 = jwt.verify(token, 'mysecret');
// console.log('decoded2 ', decoded2);

const Mutation = {
    async createUsers(parent, args, {
        db,
        prisma
    }, info) {

        const emailTaken = await prisma.exists.User({
            email: args.data.email
        })
        if (emailTaken) {
            throw new Error('Email Taken.')
        }

        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        const password =  await bcrypt.hash(args.data.password, 10);

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            'token' : jwt.sign({ 'userId': user.id}, 'thisisasecret')
        }
    },
    async login(parent, args, {
        prisma,
        db
    }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })
        if (!user) {
            throw new Error('Unable to login.')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);
        if(!isMatch) {
            throw new Error('Unable to login.')
        }
        
        return {
            user,
            'token' : jwt.sign({ 'userId': user.id}, 'thisisasecret')
        }
    },
    async deleteUsers(parent, args, {
        db,
        prisma,
        request
    }, info) {
        const userId = getUserId(request);

        const userExists = await prisma.exists.User({
            id: userId
        })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUsers(parent, args, {
        db,
        prisma,
        request
    }, info) {

        const userId = getUserId(request);

        const userExists = await prisma.exists.User({
            id: userId
        })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    async createPosts(parent, args, {
        db,
        pubsub,
        prisma,
        request
    }, info) {
        const userId = getUserId(request);

        const userExists = await prisma.exists.User({
            id: args.data.author
        })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async deletePosts(parent, args, {
        db,
        pubsub,
        prisma,
        request
    }, info) {
        const userId = getUserId(request);

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id : userId
            }
        })

        if (!postExists) {
            throw new Error('Post not found')
        }

        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePosts(parent, args, {
        db,
        pubsub,
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists) {
            throw new Error('Post not found')
        }

        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info)
    },
    async createComments(parent, args, {
        db,
        pubsub,
        prisma,
        request
    }, info) {
        //const userId = getUserId(request)

        const userExists = await prisma.exists.User({
            id: args.data.author
        })

        if (!userExists) {
            throw new Error('User not found')
        }

        const postExists = await prisma.exists.Post({
            id: args.data.postId
        })

        if (!postExists) {
            throw new Error('Post not found')
        }

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                postId: {
                    connect: {
                        id: args.data.postId
                    }
                }
            }
        }, info)
    },
    async deleteComments(parent, args, {
        db,
        pubsub,
        prisma
    }, info) {
        const commentExists = await prisma.exists.Comment({
            id: args.id
        })

        if (!commentExists) {
            throw new Error('Comment not found')
        }

        return prisma.mutation.deleteComment({
            where : {
                id : args.id
            }
        }, info)
    },
    async updateComments(parent, args, {
        db,
        pubsub,
        prisma
    }, info) {
        const commentExists = await prisma.exists.Comment({
            id: args.id
        })

        if (!commentExists) {
            throw new Error('Comment not found')
        }

        return prisma.mutation.updateComment({
            where : {
                id : args.id
            },
            update : args.data
        }, info)
    }
}

export {
    Mutation as
    default
}