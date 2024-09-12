'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchTodos } from '@/store/todoSlice';
import TodoList from '@/components/TodoList/TodoList';
import Layout from '@/components/Layout/Layout';
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>
        <TodoList todos={todos} />
      </div>
    </Layout>
  );
};

export default Home;