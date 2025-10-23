"use client";

import {Button} from "@/components/ui/button";
import {PostCard} from "./PostCard";
import {Post} from "./types";

// Sample post data
const SAMPLE_POSTS: Post[] = [
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

export default function Posts() {
    return (
        <div className="flex flex-col overflow-hidden rounded-panel bg-white">
            {/* Header */}
            <div className="h-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
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