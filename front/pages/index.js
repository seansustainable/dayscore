import React, {useEffect} from 'react';
import AppLayout from '../components/AppLayout';
import {useDispatch, useSelector} from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post);
    // const { isLoggedIn } = useSelector(state => state.user);
    // const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((c) => {
                return (
                    <PostCard key={c.id} post={c} />
                );
            })}
        </AppLayout>
    );
};

export default Home;