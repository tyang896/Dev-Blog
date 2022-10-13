// const postCont = document.querySelector('.post-container')
// const postId = postCont.getAttribute('id');
// console.log(postId);


console.log("This edit.js file is connected")
const newPost = async () => {
    const response =  await fetch('/create', {
        method: 'GET',
    })

    if (response.ok){
        document.location.replace('/create');
    }
    
}

const updatePost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-name').value.trim();
    const content = document.querySelector('#content-description').value.trim();
    if (title && content) {
        const response = await fetch('/api/posts/:id', {
            method: 'UPDATE',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'},
        })
        if (response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

}

// const getPost = async (event) => {
//     const response = await fetch('/dashboard/:id', {
//         method: 'GET'
//     })
// }

document.querySelector('#new-post').addEventListener('click', newPost);


document.querySelector('.updateBtn').addEventListener('submit', updatePost);
document.querySelector('.deleteBtn').addEventListener('submit', deletePost);
// document.querySelector('.post-link').addEventListener('click', );