const postId = document.location.pathname.split("/").pop();

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
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
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


const deletePost = async (event) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
}

document.querySelector('#new-post').addEventListener('click', newPost);
document.querySelector('#updateBtn').addEventListener('click', updatePost);
document.querySelector('#deleteBtn').addEventListener('click', deletePost);
