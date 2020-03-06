import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma =  new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: "thisismysupersecrettest",
    fragmentReplacements
})

export {prisma as default}

/**
 * prisma.query
 */

// prisma.query.users(null, '{ id, name, email, posts { id , title} }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id, text, author { id, name }}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

/**
 * prisma.mutation
 */

//  prisma.mutation.createPost({
//     data : {
//         title : "Testing123458",
//         body: "Testing123458",
//         published: false,
//         author : {
//             connect : {
//                 id: "ck624mz0u029k0731eehjthup"
//             }
//         }
//     }
//  }, '{ id title body published }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.users(null, '{ id name email posts { id title} }')
//  }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//  })

// prisma.mutation.updatePost({
//     data : {
//         published : true,
//         body : "Testing1234588"
//     },
//     where : {
//         id: "ck63cw8di03du0831kehwhmqk"
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.posts(null, '{id title body published author { id name }}')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

/**
 * Asyn Await
 */

//  const createsPostForUser = async (authorId, data) => {
//     const post = await prisma.mutation.createPost({
//         data : {
//             ...data,
//             author : {
//                 connect : {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ id }')
//     const user = await prisma.query.user({
//         where : {
//             id : authorId
//         }
//     }, '{ id name email posts { id title published} }')
//     return user
//  }

//  createsPostForUser('ck664olhn032k0831zzsxm8sd', {
//     title : "Great books to read",
//     body : "The war of Art",
//     published : true
//  }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//  })

// const updatePostByPostId = async (postId, data) => {
//     const post = await prisma.mutation.updatePost({
//         data : {
//             ...data
//         },
//         where : {
//             id : postId
//         }
//     }, '{ author { id }}')
//     const users = await prisma.query.user({
//         where : {
//             id : post.author.id
//         }
//     }, '{ id name email posts { id title published }}')
//     return users
// }

// updatePostByPostId('ck664r47f034b0831t2qxy19i', {
//     published : true
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

/**
 * prisma.exists
 */

//  prisma.exists.Comment({
//     id: "ck628441m02yv073104i4xvrw",
//     author : {
//         id: "ck624mz0u029k0731eehjthup"
//     }
//  }). then((exists) => {
//     console.log(exists)
//  })

//  const createsPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({ id: authorId })

//     if (!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data : {
//             ...data,
//             author : {
//                 connect : {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name  email posts { id  title published}}}')
    
//     return post.author
//  }

//   createsPostForUser('ck664olhn032k0831zzsxm8sd', {
//      title : "Great books to read part3",
//      body : "The war of Art part 3",
//      published : true
//   }).then((data) => {
//      console.log(JSON.stringify(data, undefined, 2))
//   }).catch((error) => {
//       console.log(error.message)
//   })

// const updatePostByPostId = async (postId, data) => {
//     const postExists = await prisma.exists.Post({ id : postId})

//     if (!postExists) {
//         throw new Error('Post not found')
//     }

//     const post = await prisma.mutation.updatePost({
//         data : {
//             ...data
//         },
//         where : {
//             id : postId
//         }
//     }, '{ author { id name email posts { id title published }}}')

//     return post.author
// }

// updatePostByPostId('ck664r47f034b0831t2qxy19i', {
//     published : true
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })