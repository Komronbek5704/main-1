import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://server-1-wqls.onrender.com';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/posts`)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const addPost = (event) => {
    event.preventDefault();
    const post = { title: newPost };

    axios.post(`${API_URL}/posts`, post)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost("");
      })
      .catch(error => console.error(error));
  };

  const deletePost = (id) => {
    axios.delete(`${API_URL}/posts/${id}`)
      .then(() => setPosts(posts.filter(post => post.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.name}--
            {post.price}$
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addPost}>
        <input 
          type="text" 
          name={newPost} 
          onChange={(e) => setNewPost(e.target.value)} 
          placeholder="New Post"
          required 
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default App;