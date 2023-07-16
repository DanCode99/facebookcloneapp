import React, {useContext, useState, useRef} from "react";
import { UserContext } from "../../contextApi/userContext";
import cover from "../../images/profile/cover2.webp";
import profile from "../../images/profile/profile.webp";
import { FriendsData } from "../data/friendsData";

export const Profile = () => {
    const { userData, modifyState} = useContext(UserContext);
    const [newPostInput, setNewPostInput] = useState("");
    const [commentInputs, setCommentInputs] = useState({});
    const [comments, setComments] = useState({}); // State to store comments for each post
    const name = userData.firstName + " " + userData.lastName;
    const [posts, setPosts] = useState([
        // State to store posts
        {
        id: 1,
        author: name,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis ultrices suscipit.",
        profileImg: profile,
        likes: 1002,
        liked: false
        },
        {
        id: 2,
        author: name,
        content: "Suspendisse potenti. Suspendisse potenti. Vestibulum condimentum finibus libero vel feugiat. Fusce tristique bibendum nisl, sit amet pharetra ante tempor eu. Curabitur gravida mollis ligula.",
        profileImg: profile,
        likes: 2514,
        liked: false
        },
        {
        id: 3,
        author: name,
        content: "Aenean scelerisque congue aliquet. Pellentesque volutpat tristique nisl, a fermentum metus dapibus eu. Vivamus id cursus odio. Nunc non est non lectus viverra semper.",
        profileImg: profile,
        likes: 14,
        liked: false
        },
        {
        id: 4,
        author: name,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque congue aliquet. a fermentum metus dapibus eu. Vivamus id cursus odio. Nunc non est non lectus viverra semper.",
        profileImg: profile,
        likes: 115,
        liked: false
        }
    ]);

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

      const handleCommentInputChange = (postId, value) => {
        setCommentInputs((prevCommentInputs) => ({
          ...prevCommentInputs,
          [postId]: value, // Update the comment input value for the specific post ID
        }));
      };

    const commentInputRefs = useRef({}); // Ref to store comment input field references

      
    return (
        <div className="profile">
            <nav className="nav-profile">
                <i className="bi bi-arrow-left" onClick={() => modifyState(1)}></i>
                <p className="name-profile">
                    {userData.firstName + " " + userData.lastName + " "}  
                     <i className="bi bi-caret-down-fill"></i>
                </p>
                <i className="bi bi-search"></i>
            </nav>
            <div className="profile-photos">
                <img src={cover} alt="coverphoto" className="cover" />
                <img src={profile} alt="profilephoto" className="profile-photo" />
            </div>
            <div className="profile-btn">
                <h3>{userData.firstName + " " + userData.lastName}</h3>
                <div className="btn-under">
                    <button className="story"><i className="bi bi-plus"></i>Add to story</button>
                    <button className="edit"><i className="bi bi-pencil-fill"></i>Edit profile</button>
                    <button className="dots"><i className="bi bi-three-dots"></i></button>
                </div>
            </div>
            <div className="profile-big">
              <div className="part-one">
                <div className="details">
                    <h1>Details</h1>
                    <p><i className="bi bi-house-door-fill"></i> Lives in Santiago, Chile</p>
                    <p><i className="bi bi-suit-heart-fill"></i> In a relationship</p>
                    <p><i className="bi bi-clock-fill"></i> Joined Febraury 2011</p>
                    <p><i className="bi bi-wifi"></i> Followed by 705 people</p>
                    <p><i className="bi bi-three-dots"></i> See your About info</p>
                    <button>Edit public details</button>
                </div>
                <div className="friends">
                    <div className="friends-header">
                        <h1>Friends</h1>
                        <p>Finds Friends</p>
                    </div>
                    <p>3,522 friends</p>
                    <div className="friends-grid">
                    {FriendsData.map((friend) => (
                        <div className="friend-item" key={friend.id}>
                        <img src={friend.image} className="friend-image" alt={friend.author} />
                        <p className="friend-name">{friend.author}</p>
                        </div>
                    ))}
                    </div>
                    <button>See all friends</button>
                </div>
              </div>
              <div className="part-two">
                <div className="post-input">
                    <h1>Posts</h1>
                    <div className="input-profile">
                        <img src={profile} onClick={() => modifyState(2)} className="post-profile"/>
                        <input
                        type="text"
                        placeholder={`What's on your mind?`}
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
                        <i className="bi bi-send"
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
                    </div> 
                </div>
                <div className="under-input">
                    <p><i className="bi bi-camera-video"></i> Live</p>
                    <p><i className="bi bi-image"></i> Photo</p>
                    <p><i className="bi bi-flag-fill"></i> Life Event</p>
                </div>
                <div className="manage-posts">
                    <button >
                        <i className="bi bi-chat-square-dots-fill"></i> Manage posts
                    </button>
                </div>
                <div className="profile-content">
                    <button><i className="bi bi-image"></i> Photos</button>
                    <button><i className="bi bi-camera-video-fill"></i> Videos</button>
                    <button><i className="bi bi-music-note-beamed"></i> Music</button>
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
            </div>
        </div>
    )
}