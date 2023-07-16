import React, {useState, useContext, useRef} from "react";
import { UserContext } from "../../contextApi/userContext";
import { Histories } from "./histories";
import { NavBar } from "./nav";
import post1 from "../../images/posts/post1.webp";
import post2 from "../../images/posts/post2.webp";
import post3 from "../../images/posts/post3.webp";
import post4 from "../../images/posts/post4.webp";
import profile from "../../images/profile/profile.webp";
import profile1 from "../../images/profile/profile1.webp";
import profile2 from "../../images/profile/profile2.webp";
import profile3 from "../../images/profile/profile3.webp";
import profile4 from "../../images/profile/profile4.webp";

export const Posts = () => {
    const { modifyState, userData } = useContext(UserContext); //context of the user
    const [newPostInput, setNewPostInput] = useState("");
    const [commentInputs, setCommentInputs] = useState({});
    const [posts, setPosts] = useState([
        // State to store posts
        {
        id: 1,
        author: "James Johnson",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis ultrices suscipit.",
        profileImg: profile1,
        image: post1,
        likes: 1002,
        liked: false
        },
        {
        id: 2,
        author: "Michael Smith",
        content: "Suspendisse potenti. Suspendisse potenti. Vestibulum condimentum finibus libero vel feugiat. Fusce tristique bibendum nisl, sit amet pharetra ante tempor eu. Curabitur gravida mollis ligula.",
        profileImg: profile2,
        image: post2,
        likes: 2514,
        liked: false
        },
        {
        id: 3,
        author: "Jessica Williams",
        content: "Aenean scelerisque congue aliquet. Pellentesque volutpat tristique nisl, a fermentum metus dapibus eu. Vivamus id cursus odio. Nunc non est non lectus viverra semper.",
        profileImg: profile3,
        image: post3,
        likes: 14,
        liked: false
        },
        {
        id: 4,
        author: "Olivia Davis",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque congue aliquet. a fermentum metus dapibus eu. Vivamus id cursus odio. Nunc non est non lectus viverra semper.",
        profileImg: profile4,
        image: post4,
        likes: 115,
        liked: false
        }
    ]);
    const [comments, setComments] = useState({}); // State to store comments for each post

    const handleLike = (postId) => {
        const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
            if (post.liked) {
            return { ...post, likes: post.likes - 1, liked: false };
            } else {
            return { ...post, likes: post.likes + 1, liked: true };
            }
        }
        return post;
        });

        setPosts(updatedPosts);
    };

    const handleComment = (postId) => {
      const commentInput = commentInputs[postId]; // Get the comment input value for the specific post ID
      if (commentInput !== "") {
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: [...(prevComments[postId] || []), commentInput],
        }));
        setCommentInputs((prevCommentInputs) => ({
          ...prevCommentInputs,
          [postId]: "", // Reset the comment input value for the specific post ID
        }));
      }
    };

    const commentInputRefs = useRef({}); // Ref to store comment input field references

    const handleCommentInputChange = (postId, value) => {
      setCommentInputs((prevCommentInputs) => ({
        ...prevCommentInputs,
        [postId]: value, // Update the comment input value for the specific post ID
      }));
    };

      return (
        <div id="posts-section">
          <NavBar/>
          <div className="post-bar">
            <img src={profile} onClick={() => modifyState(2)} className="post-profile"/>
            <input
              type="text"
              placeholder={`What's on your mind, ${userData.firstName}?`}
              value={newPostInput}
              onChange={(e) => setNewPostInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && newPostInput.trim() !== "") {
                  const newPost = {
                    id: posts.length + 1,
                    author: userData.firstName + " " + userData.lastName,
                    content: newPostInput,
                    likes: 0,
                    liked: false,
                  };
                  setPosts([newPost, ...posts]);
                  setNewPostInput("");
                }
              }}
            />
            <i 
            className="bi bi-send"
            onClick={() => {
              if (newPostInput.trim() !== "") {
                const newPost = {
                  id: posts.length + 1,
                  author: userData.firstName + " " + userData.lastName,
                  content: newPostInput,
                  profileImg: profile,
                  likes: 0,
                  liked: false,
                };
                setPosts([newPost, ...posts]);
                setNewPostInput("");
              }
            }}
            ></i>
            <i className="bi bi-image"></i>
          </div>
          <div>
            <Histories/>
          </div>
          <div>
          {posts.map((post) => (
    <section key={post.id} className="post-item">
      <div className="post-top">
        <img
          src={post.profileImg}
          className="post-profile"
          onClick={() =>
            post.author === userData.firstName + " " + userData.lastName &&
            modifyState(2)
          }
        />
        <p>{post.author}</p>
      </div>
      <div className="post-med">
        <p>{post.content}</p>
        <img src={post.image} className="post-image" />
        <p>
          <i
              className={`bi bi-hand-thumbs-up${post.liked ? "-fill" : ""}`}
            ></i>
          {post.likes}
        </p>
      </div>
      <div className="post-btn">
        <button
          onClick={() => handleLike(post.id)}
          className={post.liked ? "liked" : ""}
        >
          <i
            className={`bi bi-hand-thumbs-up${post.liked ? "-fill" : ""}`}
          ></i>
        </button>
        <button
          onClick={() => {
            const commentInputRef = commentInputRefs.current[post.id];
            if (commentInputRef) {
              commentInputRef.focus();
            }
          }}
        >
        <i className="bi bi-chat-left"> </i>Comment
        </button>
        <button>
          <i className="bi bi-box-arrow-in-up-right"></i>Share
        </button>
      </div>
      <div className="post-input">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentInputs[post.id] || ""}
          onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              handleComment(post.id);
            }
          }}
          ref={(ref) => {
            commentInputRefs.current[post.id] = ref;
          }}
        />
        <button
          onClick={() => {
            const commentInput = commentInputs[post.id] || "";
            if (commentInput.trim() !== "") {
              handleComment(post.id);
            }
          }}
        >
        <i className="bi bi-send"></i>
        </button>
      </div>
        {comments[post.id] && (
          <div>
            {comments[post.id].map((comment, index) => (
              <div key={post.id} className="post-comment">
                <div className="top-comment">
                  <img src={profile} className="post-profile"/>
                  <p>
                    {userData.firstName} {userData.lastName}
                  </p>
                </div>
                <p key={index}>{comment}</p>
              </div>
            ))}
          </div>
        )}
    </section>
    ))}
          </div>
        </div>
      );
}