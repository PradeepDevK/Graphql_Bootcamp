const Subscription = {    
    comment : {
        subscribe(parent, { postId }, { prisma }, info) {

            // Prisma -> Node -> Client (GraphQL Playground)

            return prisma.subscription.comment({
                where: {
                    node : {
                        postId : {
                            id: postId
                        }
                    }
                }
            }, info)


            // const post = db.posts.find((post) => post.id === postId)

            // if (!post) {
            //     throw new Error('Post not found')
            // }

            // return pubsub.asyncIterator(`comment ${ postId }`)
        }
    },
    post: {
        subscribe(parent, args, { prisma }, info) {

            // Prisma -> Node -> Client (GraphQL Playground)

            return prisma.subscription.post({
                where: {
                    node: {
                        published : true
                    }
                }
            }, info)

            // return pubsub.asyncIterator('post')
        }
    }
}

export {Subscription as default}