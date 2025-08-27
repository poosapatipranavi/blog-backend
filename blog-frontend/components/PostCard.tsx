// components/PostCard.tsx
import { Pencil, Trash2 } from 'lucide-react';

// FIX: Add the "export" keyword here
export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onEdit: (post: Post) => void;
}

export default function PostCard({ post, onDelete, onEdit }: PostCardProps) {
  const imageUrl = `https://placehold.co/600x400/d1d5db/4b5563?text=${encodeURIComponent(post.title)}`;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={imageUrl} alt={`Image for ${post.title}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className="text-2xl font-bold text-white leading-tight">{post.title}</h2>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>By {post.author || 'Anonymous'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="p-4 bg-gray-50 flex justify-end space-x-3">
        <button onClick={() => onEdit(post)} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
          <Pencil size={18} />
          <span>Edit</span>
        </button>
        <button onClick={() => onDelete(post._id)} className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors">
          <Trash2 size={18} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}