// Store posts in memory
let posts = [];
let selectedImages = [];

// DOM Elements
const postInputTrigger = document.getElementById('postInputTrigger');
const imageInput = document.getElementById('imageInput');
const createPostModal = document.getElementById('createPostModal');
const closeModal = document.getElementById('closeModal');
const cancelPost = document.getElementById('cancelPost');
const submitPost = document.getElementById('submitPost');
const postText = document.getElementById('postText');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const postsFeed = document.getElementById('postsFeed');
const postOption = document.querySelector('.post-option');

// Open modal when clicking on "What's on your mind?"
postInputTrigger.addEventListener('click', () => {
    openModal();
});

// Open modal when clicking Photo/Video button
postOption.addEventListener('click', () => {
    openModal();
    // Trigger file input
    setTimeout(() => imageInput.click(), 100);
});

// Handle image selection
imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                selectedImages.push({
                    data: event.target.result,
                    name: file.name
                });
                displayImagePreviews();
            };
            reader.readAsDataURL(file);
        }
    });
    // Reset input
    imageInput.value = '';
});

// Display image previews
function displayImagePreviews() {
    imagePreviewContainer.innerHTML = '';
    selectedImages.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        previewItem.innerHTML = `
            <img src="${image.data}" alt="${image.name}">
            <button class="remove-image" data-index="${index}">&times;</button>
        `;
        imagePreviewContainer.appendChild(previewItem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-image').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            selectedImages.splice(index, 1);
            displayImagePreviews();
        });
    });
}

// Open modal
function openModal() {
    createPostModal.classList.add('show');
    postText.focus();
}

// Close modal
function closeModalFunc() {
    createPostModal.classList.remove('show');
    postText.value = '';
    selectedImages = [];
    imagePreviewContainer.innerHTML = '';
}

// Event listeners for closing modal
closeModal.addEventListener('click', closeModalFunc);
cancelPost.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
createPostModal.addEventListener('click', (e) => {
    if (e.target === createPostModal) {
        closeModalFunc();
    }
});

// Submit post
submitPost.addEventListener('click', () => {
    const text = postText.value.trim();
    
    if (!text && selectedImages.length === 0) {
        alert('Please write something or add an image.');
        return;
    }

    // Create post object
    const post = {
        id: Date.now(),
        text: text,
        images: [...selectedImages],
        timestamp: new Date(),
        author: 'Admin User'
    };

    // Add to posts array
    posts.unshift(post);

    // Display post
    displayPosts();

    // Close modal and reset
    closeModalFunc();
});

// Display all posts
function displayPosts() {
    if (posts.length === 0) {
        postsFeed.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-newspaper"></i>
                <h3>No posts yet</h3>
                <p>Share an update by clicking the input above or uploading a photo.</p>
            </div>
        `;
        return;
    }

    postsFeed.innerHTML = '';
    posts.forEach(post => {
        const postCard = createPostCard(post);
        postsFeed.appendChild(postCard);
    });
}

// Create post card element
function createPostCard(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.dataset.postId = post.id;

    const timeAgo = getTimeAgo(post.timestamp);

    let imagesHTML = '';
    if (post.images.length > 0) {
        imagesHTML = post.images.map(img => 
            `<img src="${img.data}" alt="${img.name}" class="post-image">`
        ).join('');
    }

    postCard.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <div class="avatar">A</div>
                <div class="post-author-info">
                    <h3>${post.author}</h3>
                    <span class="post-time">${timeAgo}</span>
                </div>
            </div>
            <button class="delete-post" data-post-id="${post.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="post-content">
            ${post.text ? `<div class="post-text">${post.text}</div>` : ''}
            ${imagesHTML}
        </div>
        <div class="post-actions">
            <button class="action-btn">
                <i class="far fa-thumbs-up"></i>
                Like
            </button>
            <button class="action-btn">
                <i class="far fa-comment"></i>
                Comment
            </button>
            <button class="action-btn">
                <i class="fas fa-share"></i>
                Share
            </button>
        </div>
    `;

    // Add delete functionality
    const deleteBtn = postCard.querySelector('.delete-post');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost(post.id);
        }
    });

    return postCard;
}

// Delete post
function deletePost(postId) {
    posts = posts.filter(p => p.id !== postId);
    displayPosts();
}

// Get time ago string
function getTimeAgo(timestamp) {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    
    return timestamp.toLocaleDateString();
}

// Initialize
displayPosts();