const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length===0 ?
    0 :
    blogs.reduce((totalSum,currentBlog) => totalSum + currentBlog.likes,0)
}

const favoriteBlog = (blogs) =>{

    return blogs.length > 0 ?
    blogs.reduce((max,currentBlog) => currentBlog.likes > max.likes ? currentBlog : max) :
    {}
}

const mostBlogs = (blogs)=>{
    let blogCounter = {}
    if(blogs.length===0){
        return blogCounter
    }
    for(let i=0;i<blogs.length;i++){
        if(blogs[i].author in blogCounter){
            blogCounter[blogs[i].author]+=1
        } else {
            blogCounter[blogs[i].author]=1
        }
    }

    blogCounter = Object.entries(blogCounter)
    let result = {'author':blogCounter[0][0],'blogs':blogCounter[0][1]}
    for (let [author, nBlogs] of blogCounter){
        if(result['blogs'] < nBlogs){
            result['blogs'] = nBlogs
            result['author'] = author
        }
    }

    return result
}

const mostLikes = (blogs) =>{
    let likeCounter = {}
    if(blogs.length===0){
        return likeCounter
    }
    for(let i=0;i<blogs.length;i++){
        if(blogs[i].author in likeCounter){
            likeCounter[blogs[i].author]+=blogs[i].likes
        } else {
            likeCounter[blogs[i].author]=blogs[i].likes
        }
    }

    likeCounter = Object.entries(likeCounter)
    let result = {'author':likeCounter[0][0],'likes':likeCounter[0][1]}
    for (let [author, nLikes] of likeCounter){
        if(result['likes'] < nLikes){
            result['likes'] = nLikes
            result['author'] = author
        }
    }

    return result
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}