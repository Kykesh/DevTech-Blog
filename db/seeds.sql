-- seeds.sql
USE tech_blog_db;

INSERT INTO users (username, password) VALUES ('user1', 'password1'), ('user2', 'password2');

INSERT INTO posts (title, content, user_id) VALUES ('First Post', 'This is the first post', 1);

INSERT INTO comments (content, post_id, user_id) VALUES ('Great post!', 1, 2);
