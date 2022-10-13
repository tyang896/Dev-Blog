
// const posts = document.querySelectorAll('button.edit-post')




const newPost = async () => {
    const response =  await fetch('/create', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok){
        document.location.replace('/create');
    }
    
}

// const editPost = async (event) => {
//     let postId = event.target.getAttribute("id");
//     console.log(postId);
//     const response = await fetch(`/dashboard/${postId}`, {
//         method: 'GET',
//         headers: {'Content-Type': 'application/json'}
//     })
//     if (response.ok){
//         document.location.replace(`/dashboard/${postId}`);
//     }
// }





document.querySelector('#new-post').addEventListener('click', newPost)
// posts.forEach(post => {
//     post.addEventListener('click', editPost)
// })


//In the future: Just hide the form, and then show it when the user clicks on the new post button