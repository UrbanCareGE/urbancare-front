"use client";

import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {MessageSquare, ThumbsUp, Share2, MoreHorizontal, Globe} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useState} from "react";

// Sample post data
const SAMPLE_POSTS = [
    {
        id: 1,
        author: "ნინო გელაშვილი",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=nino",
        content: "გამარჯობა მეზობლებო! ვინმემ იცით მეიქსერის კარგი ოსტატი თბილისში? დახმარება მჭირდება სამზარეულოში რემონტისთვის.",
        timestamp: "2 საათის წინ",
        likes: 12,
        comments: 5,
        shares: 2
    },
    {
        id: 2,
        author: "გიორგი მამულაშვილი",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=giorgi",
        content: "ახალი პარკი ჩვენს უბანში! 🌳 ბოლოს და ბოლოს დაასრულეს მშენებლობა. ძალიან ლამაზია!",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        timestamp: "3 საათის წინ",
        likes: 45,
        comments: 18,
        shares: 7
    },
    {
        id: 3,
        author: "ანა თევზაძე",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
        content: "ვაბჟენდი ძაღლის საკვებს თუ ვინმეს აინტერესებს. თითქმის სრული შეფუთვა. ჩვენს ძაღლს არ მოეწონა. უფასოდ.",
        timestamp: "5 საათის წინ",
        likes: 8,
        comments: 3,
        shares: 0
    },
    {
        id: 4,
        author: "დავით ხეცურიანი",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=davit",
        content: "ნახეთ რა სანთლები დავამზადე ხელით! 🕯️ თუ დაინტერესდით, შემიძლია მასტერ-კლასი ჩავატარო უბანში.",
        images: [
            "https://images.unsplash.com/photo-1602874801006-90c7285b0c79?w=400&q=80",
            "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80",
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80"
        ],
        timestamp: "1 დღის წინ",
        likes: 34,
        comments: 15,
        shares: 4
    },
    {
        id: 5,
        author: "მარიამ კაპანაძე",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=mariam",
        content: "გმადლობთ ყველას ვინც გუშინ დამეხმარა ნივთების ატარებაში! ასეთი საუკეთესო მეზობლები გვყავს! ❤️",
        timestamp: "1 დღის წინ",
        likes: 25,
        comments: 12,
        shares: 5
    },
    {
        id: 6,
        author: "ლევან ქართველიშვილი",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=levan",
        content: "სადმე თქვენს სადარბაზოში ვიპოვე გასაღები. ვინმეს დაეკარგა? დამიკავშირდით.",
        timestamp: "2 დღის წინ",
        likes: 15,
        comments: 4,
        shares: 3
    }
];

function PostCard({post}: { post: typeof SAMPLE_POSTS[0] }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Post Header - Facebook style */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorImage} alt={post.author}/>
                        <AvatarFallback className="bg-primary text-white">
                            {post.author.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm hover:underline cursor-pointer">
                            {post.author}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{post.timestamp}</span>
                            <span>·</span>
                            <Globe className="w-3 h-3"/>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5 text-gray-600"/>
                </Button>
            </div>

            {/* Post Content */}
            {post.content && (
                <div className="px-4 pb-3">
                    <p className="text-sm leading-5 whitespace-pre-wrap">
                        {post.content}
                    </p>
                </div>
            )}

            {/* Single Image */}
            {'image' in post && post.image && (
                <div className="w-full cursor-pointer">
                    <img
                        src={post.image}
                        alt="Post image"
                        className="w-full object-cover max-h-[600px]"
                    />
                </div>
            )}

            {/* Multiple Images Grid */}
            {'images' in post && post.images && post.images.length > 0 && (
                <div className={`w-full grid gap-0.5 ${
                    post.images.length === 1 ? 'grid-cols-1' :
                    post.images.length === 2 ? 'grid-cols-2' :
                    post.images.length === 3 ? 'grid-cols-3' :
                    'grid-cols-2'
                }`}>
                    {post.images.slice(0, 4).map((img, idx) => (
                        <div
                            key={idx}
                            className={`relative cursor-pointer overflow-hidden ${
                                post.images!.length === 3 && idx === 0 ? 'col-span-3' :
                                post.images!.length > 4 && idx === 3 ? 'relative' : ''
                            }`}
                        >
                            <img
                                src={img}
                                alt={`Post image ${idx + 1}`}
                                className={`w-full object-cover ${
                                    post.images!.length === 1 ? 'max-h-[600px]' :
                                    post.images!.length === 2 ? 'h-[300px]' :
                                    post.images!.length === 3 && idx === 0 ? 'h-[250px]' :
                                    'h-[200px]'
                                }`}
                            />
                            {post.images!.length > 4 && idx === 3 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-white text-3xl font-semibold">
                                        +{post.images!.length - 4}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Like/Comment Count */}
            {(post.likes > 0 || post.comments > 0 || post.shares > 0) && (
                <div className="px-4 pb-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            {post.likes > 0 && (
                                <div className="flex items-center gap-1">
                                    <div
                                        className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-primary">
                                        <ThumbsUp className="w-[10px] h-[10px] text-white fill-white"/>
                                    </div>
                                    <span className="hover:underline cursor-pointer">{post.likes}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {post.comments > 0 && (
                                <span className="hover:underline cursor-pointer">
                                    {post.comments} კომენტარი
                                </span>
                            )}
                            {post.shares > 0 && (
                                <span className="hover:underline cursor-pointer">
                                    {post.shares} გაზიარება
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Separator/>

            {/* Action Buttons - Facebook style */}
            <div className="flex items-center justify-around px-2 py-1">
                <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                        liked ? 'text-primary font-semibold' : 'text-gray-600'
                    }`}
                >
                    <ThumbsUp className={`w-[18px] h-[18px] ${liked ? 'fill-primary' : ''}`}/>
                    <span className="text-sm font-medium">მოწონება</span>
                </button>
                <button
                    className="flex items-center justify-center gap-2 flex-1 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
                    <MessageSquare className="w-[18px] h-[18px]"/>
                    <span className="text-sm font-medium">კომენტარი</span>
                </button>
                <button
                    className="flex items-center justify-center gap-2 flex-1 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
                    <Share2 className="w-[18px] h-[18px]"/>
                    <span className="text-sm font-medium">გაზიარება</span>
                </button>
            </div>
        </div>
    );
}

export default function Posts() {
    return (
        <div className="h-full flex flex-col overflow-hidden bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold">პოსტები</h1>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                    პოსტის დამატება
                </Button>
            </div>

            {/* Posts Feed - scrollable */}
            <div className="overflow-y-auto flex-1 px-4 py-4">
                <div className="max-w-[680px] mx-auto space-y-4">
                    {SAMPLE_POSTS.map((post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </div>
            </div>
        </div>
    );
}