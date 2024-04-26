// script.js
document.addEventListener('DOMContentLoaded', function() {

    const deleteButtons = document.querySelectorAll('.delete-post');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const postId = e.target.getAttribute('data-id');
            
            fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    console.log('Post deleted');
                    location.reload();
                } else {
                    alert('Error deleting post');
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });
        });
    });

});
