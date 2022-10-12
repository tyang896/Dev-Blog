const commentFormHandler = async (event) => {
    event.preventDefault();
    console.log(event.target.getAttribute('id'));

    const comment = document.querySelector('#comment-description').value.trim();
    const postId = event.target.getAttribute('id');

    if(comment !== "" && comment !== "null"){
        const response = await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({comment, post_id: postId}),
            headers: {'Content-Type': 'application/json'},
        })
        if(response.ok){
            document.location.replace(`/${postId}`)
        } else {
            alert(response.statusText);
        }
    }
}



document
.querySelector('.comment-form')
.addEventListener('submit', commentFormHandler);

