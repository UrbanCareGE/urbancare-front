'use client'

import React from 'react';
import {UrbanCareIcon, UrbanCareTextIcon} from "@/components/common/logo/AppLogo";

export function MinimalLoader() {
    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Logo */}
                <div
                    className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 animate-pulse">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                </div>

                {/* Simple dots loader */}
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                         style={{animationDelay: '0ms'}}/>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                         style={{animationDelay: '150ms'}}/>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                         style={{animationDelay: '300ms'}}/>
                </div>
            </div>
        </div>
    );
}

// Option 2: Spinner with Text
export function SpinnerLoader() {
    return (
        <div
            className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                {/* Logo */}
                <div
                    className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                </div>

                {/* Spinner */}
                <div className="relative">
                    <div className="w-10 h-10 border-4 border-emerald-100 rounded-full"/>
                    <div
                        className="absolute top-0 left-0 w-10 h-10 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin"/>
                </div>

                <p className="text-gray-500 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
}

export function ProgressLoader() {
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Top progress bar */}
            <div className="h-1 w-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-progress"/>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        UrbanCare
                    </h1>
                </div>
            </div>

            <style jsx>{`
                @keyframes progress {
                    0% {
                        transform: translateX(-100%);
                    }
                    50% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-progress {
                    animation: progress 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export function PulsingLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm">
            <div className="flex flex-col items-center gap-5">
                {/* Pulsing rings */}
                <div className="relative">
                    <div className="absolute inset-0 w-30 h-30 bg-primary rounded-full animate-ping opacity-20"/>
                    <UrbanCareIcon/>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <UrbanCareTextIcon/>
                </div>
            </div>
        </div>
    );
}

export function SkeletonLoader() {
    return (
        <div className="fixed inset-0 z-50 bg-gray-50">
            {/* Header skeleton */}
            <div className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-4">
                <div
                    className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"/>
                <div className="ml-auto h-8 w-8 bg-gray-200 rounded-full animate-pulse"/>
            </div>

            {/* Content skeleton */}
            <div className="p-4 space-y-4">
                <div className="h-32 bg-white rounded-2xl shadow-sm animate-pulse"/>
                <div className="h-24 bg-white rounded-2xl shadow-sm animate-pulse" style={{animationDelay: '100ms'}}/>
                <div className="h-24 bg-white rounded-2xl shadow-sm animate-pulse" style={{animationDelay: '200ms'}}/>
                <div className="h-24 bg-white rounded-2xl shadow-sm animate-pulse" style={{animationDelay: '300ms'}}/>
            </div>

            {/* Center loading indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-8 h-8 border-3 border-emerald-100 rounded-full"/>
                        <div
                            className="absolute top-0 left-0 w-8 h-8 border-3 border-transparent border-t-emerald-500 rounded-full animate-spin"/>
                    </div>
                    <p className="text-gray-600 text-sm font-medium">Loading your space...</p>
                </div>
            </div>
        </div>
    );
}