'use client';

import React from 'react';
import {PlusCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import ThreadCard from './ThreadCard';
import type {Post} from '../types';
import ThreadHeader from "@/components/posts/mobile/ThreadHeader";
import {useMobileScroll} from "@/hooks/use-mobile-scroll";

// Sample data with neighborhood categories
const samplePosts: Post[] = [
    {
        id: 1,
        content: 'Found a lost golden retriever near Oak Street Park. Very friendly, has a blue collar. Anyone missing their pup? 🐕',
        author: {
            name: 'Sarah Mitchell',
            username: 'sarahmitchell',
            neighborhood: 'Oak District',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        category: 'Lost & Found',
        categoryColor: 'from-amber-400 to-orange-500',
        votes: 47,
        comments: 12,
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
    {
        id: 2,
        content: 'Organizing a neighborhood cleanup this Saturday at 9 AM! Meet at the community center. Bring gloves and good vibes! ♻️',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop',
        author: {
            name: 'Mike Rodriguez',
            username: 'mikero',
            neighborhood: 'Riverside',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        },
        category: 'Events',
        categoryColor: 'from-purple-400 to-pink-500',
        votes: 128,
        comments: 34,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 3,
        content: 'Anyone know a good plumber? Our kitchen sink is acting up again. Would love local recommendations! 🔧',
        author: {
            name: 'Jennifer Park',
            username: 'jenpark',
            neighborhood: 'Hillside',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
        },
        category: 'Ask Neighbors',
        categoryColor: 'from-blue-400 to-cyan-500',
        votes: 23,
        comments: 18,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 4,
        content: 'Beautiful sunset view from the hill today! We\'re so lucky to live here 🌅',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
        author: {
            name: 'Alex Chen',
            username: 'alexchen',
            neighborhood: 'Oak District',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        },
        category: 'General',
        categoryColor: 'from-green-400 to-emerald-500',
        votes: 234,
        comments: 45,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
];

export default function ThreadFeed() {
    return (
        <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
            <div className={"h-20"}></div>
            <ThreadHeader/>
            {/* Posts Feed */}
            <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-20">
                {samplePosts.map((post) => (
                    <ThreadCard key={post.id} post={post}/>
                ))}

                {/* Load More */}
                <div className="text-center pt-4">
                    <Button
                        variant="ghost"
                        className="rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    >
                        Load more posts
                    </Button>
                </div>
            </main>
        </div>
    );
}