// components/PostModal.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Post } from './PostCard'; // Make sure to import the Post type

// Define the types for the component's props to fix 'any' errors
interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: Partial<Post>) => void;
    post: Post | null;
}

export default function PostModal({ isOpen, onClose, onSave, post }: PostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author || 'Anonymous');
      } else {
        setTitle('');
        setContent('');
        setAuthor('Anonymous');
      }
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...post, title, content, author });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative transform transition-all" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">{post ? 'Edit Post' : 'Create New Post'}</h3>
        <div className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your amazing content here..." className="w-full p-3 border border-gray-300 rounded-md h-48 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" rows={5}></textarea>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold transition">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold shadow-md transition">Save Post</button>
        </div>
      </div>
    </div>
  );
}