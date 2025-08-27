// app/page.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import PostCard, { Post } from '../components/PostCard';
import PostModal from '../components/PostModal';
//import PostModal from '../components/PostModal';
import { PlusCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/posts';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // Give the state a type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null); // Give the state a type
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch posts. Is the backend running?');
      const data = await response.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Add a type to the 'post' parameter to fix the 'any' error
  const handleSave = async (post: Partial<Post>) => {
    const method = post._id ? 'PUT' : 'POST';
    const url = post._id ? `${API_URL}/${post._id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: post.title, content: post.content, author: post.author }),
      });
      if (!response.ok) throw new Error('Failed to save the post.');
      setIsModalOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      alert('Failed to delete the post.');
    }
  };
  
  // Add a type to the 'post' parameter
  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-56 bg-gray-300"></div>
        <div className="p-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
            The Modern Blog
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Powered by NestJS, Next.js, and MongoDB. A showcase of modern full-stack development.
          </p>
        </header>
        
        <div className="flex justify-center mb-12">
          <button onClick={handleCreate} className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105 transform">
            <PlusCircle size={20} />
            <span>Create New Post</span>
          </button>
        </div>
        
        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">Error: {error}</p>}
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => <LoadingSkeleton key={index} />)
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} onDelete={handleDelete} onEdit={handleEdit} />
            ))
          )}
        </div>
      </main>
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} post={editingPost} />
    </div>
  );
}
