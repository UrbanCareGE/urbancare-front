'use client';

import React, {useState} from 'react';
import {ArrowBigDown, ArrowBigUp, Clock, MapPin, MessageCircle, Share2} from 'lucide-react';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import type {Post, VoteStatus} from '../types';

interface PostCardProps {
    post: Post;
}

export default function ThreadCard({post}: PostCardProps) {
    const [votes, setVotes] = useState<number>(post.votes || 0);
    const [voteStatus, setVoteStatus] = useState<VoteStatus>(null);

    const handleVote = (type: 'up' | 'down') => {
        if (voteStatus === type) {
            setVotes(votes + (type === 'up' ? -1 : 1));
            setVoteStatus(null);
        } else if (voteStatus === null) {
            setVotes(votes + (type === 'up' ? 1 : -1));
            setVoteStatus(type);
        } else {
            setVotes(votes + (type === 'up' ? 2 : -2));
            setVoteStatus(type);
        }
    };

    const formatTime = (date: string): string => {
        const now = new Date();
        const posted = new Date(date);
        const diffInMinutes = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'now';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h`;
        return `${Math.floor(diffInHours / 24)}d`;
    };

    return (
        <Card className="overflow-hidden shadow-lg border-slate-200 hover:shadow-xl transition-all duration-300">
            {/* Category Badge */}
            <div className="px-5 pt-4 pb-2">
                <Badge className={`bg-gradient-to-r ${post.categoryColor} text-white border-0`}>
                    {post.category}
                </Badge>
            </div>

            {/* Author Info */}
            <div className="flex items-start gap-3 px-5 pb-3">
                <Avatar className="w-11 h-11 ring-2 ring-slate-100 z-0">
                    <AvatarImage src={post.author.avatar} alt={post.author.name}/>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {post.author.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 text-sm truncate">
                            {post.author.name}
                        </h3>
                        <span className="text-slate-400">·</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3"/>
                            {formatTime(post.createdAt)}
            </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3"/>
                        {post.author.neighborhood}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-3">
                {post.title && (
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">
                        {post.title}
                    </h2>
                )}
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </p>
            </div>

            {/* Image */}
            {post.image && (
                <div className="px-3 pb-3">
                    <img
                        src={post.image}
                        alt="Post content"
                        className="w-full rounded-2xl object-cover max-h-80"
                    />
                </div>
            )}

            {/* Video */}
            {post.video && (
                <div className="px-3 pb-3">
                    <video
                        src={post.video}
                        controls
                        className="w-full rounded-2xl object-cover max-h-80 bg-black"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                {/* Vote Section */}
                <div className="flex items-center gap-0.5 bg-slate-50 rounded-full p-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleVote('up')}
                        className={`h-8 w-8 rounded-full transition-all ${
                            voteStatus === 'up'
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'hover:bg-slate-200 text-slate-600'
                        }`}
                    >
                        <ArrowBigUp className={`w-4 h-4 ${voteStatus === 'up' ? 'fill-current' : ''}`}/>
                    </Button>

                    <span className={`px-3 text-sm font-semibold min-w-[35px] text-center ${
                        voteStatus === 'up' ? 'text-orange-600' :
                            voteStatus === 'down' ? 'text-blue-600' : 'text-slate-700'
                    }`}>
            {votes}
          </span>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleVote('down')}
                        className={`h-8 w-8 rounded-full transition-all ${
                            voteStatus === 'down'
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'hover:bg-slate-200 text-slate-600'
                        }`}
                    >
                        <ArrowBigDown className={`w-4 h-4 ${voteStatus === 'down' ? 'fill-current' : ''}`}/>
                    </Button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-slate-600 hover:text-slate-900"
                    >
                        <MessageCircle className="w-4 h-4"/>
                        <span className="text-sm font-medium">{post.comments}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-600 hover:text-slate-900"
                    >
                        <Share2 className="w-4 h-4"/>
                    </Button>
                </div>
            </div>
        </Card>
    );
}