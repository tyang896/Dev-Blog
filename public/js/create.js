const newPost = async () => {
    const response =  await fetch('/create', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok){
        document.location.replace('/create');
    }
    
}

const handleNewPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-name').value.trim();
    const content = document.querySelector('#content-description').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'},
        });
    
        if (response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

}




document.querySelector('#new-post').addEventListener('click', newPost)
document.querySelector('.create-form').addEventListener('submit', handleNewPost);
