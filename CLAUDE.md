# UrbanCare Frontend

Community management platform for apartment buildings featuring thread discussions, polls, urgent notifications, and real-time chat.

- **Language**: Georgian UI (FiraGO font), English codebase
- **Backend**: Java API (proxied through Next.js)

## Tech Stack

```
Framework:     Next.js 16.1.0 (App Router + Turbopack)
UI Library:    React 19.1.0
Language:      TypeScript (strict mode)
Styling:       Tailwind CSS + shadcn/ui (Radix primitives)
State:         TanStack React Query v5
Forms:         react-hook-form + Zod validation
Chat:          TalkJS integration
Icons:         Lucide React
Animations:    GSAP, Motion (Framer), Three.js
```

## Directory Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (home)/              # Grouped home routes
│   │   └── apartment/[apartmentId]/
│   │       ├── news/        # Thread feed
│   │       ├── documents/   # Apartment docs
│   │       ├── finances/    # Financial info
│   │       ├── profile/     # User profile
│   │       ├── post/        # Create content
│   │       ├── info/        # Contacts, cars, docs
│   │       └── urgent/      # Urgent notifications
│   ├── auth/                # Login/Register
│   └── api/                 # API routes + proxy
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── common/              # Shared (header, navbar, avatar, etc.)
│   ├── thread/              # Thread/discussion feature
│   ├── poll/                # Poll components
│   ├── chat/                # TalkJS chat
│   ├── profile/             # Profile management
│   ├── urgent/              # Urgent notifications
│   └── provider/            # Context providers
├── hooks/
│   ├── query/               # React Query hooks by feature
│   │   ├── auth/            # useLogin, useRegister, useOtp
│   │   ├── thread/          # useCreateThread, useFetchThreads, usePollVote, useReactionVote
│   │   ├── user/            # useUpdateProfile, useCars
│   │   ├── chat/            # useChat
│   │   └── urgent/          # useUrgent
│   ├── use-device.ts        # Device detection (mobile/tablet/desktop)
│   ├── use-mobile-keyboard.ts
│   └── use-mobile-scroll.ts
├── lib/
│   ├── api-client.ts        # HTTP client with typed generics
│   └── utils.ts             # cn(), formatTime()
├── model/                   # DTOs
│   ├── auth.dto.ts          # User, Login, Register, Apartment
│   ├── thread.dto.ts        # Thread, Comment, Vote, Poll, Tags
│   ├── common.dto.ts        # SuccessResponse, ErrorResponse, Paging
│   ├── urgent.dto.ts        # UrgentItem
│   ├── info.dto.ts          # Contacts, Documents, Cars
│   └── chat.dto.ts          # Chat models
├── service/                 # API services
│   ├── auth-service.ts
│   ├── thread-service.ts
│   ├── profile-service.ts
│   ├── file-service.ts
│   ├── urgent-service.ts
│   └── info-service.ts
└── proxy.ts                 # Route protection middleware
```

## Component Patterns

### Compound Components (Object.assign)

```typescript
export const ThreadCard = Object.assign(ThreadCardRoot, {
    Header: ThreadCardHeader,
    Body: ThreadCardBody,
    Footer: ThreadCardFooter,
});

// Usage:
<ThreadCard thread={thread}>
    <ThreadCard.Header />
    <ThreadCard.Body />
    <ThreadCard.Footer />
</ThreadCard>
```

### Context-Based Component State

```typescript
const ThreadContext = createContext<ThreadContextValue | undefined>(undefined);

export function useThread() {
    const context = useContext(ThreadContext);
    if (!context) throw new Error('useThread must be used within ThreadCard');
    return context;
}
```

### Class Composition

```typescript
import { cn } from '@/lib/utils';
<div className={cn("base-classes", conditional && "conditional-class", className)} />
```

## API Client Pattern

**Location:** `src/lib/api-client.ts`

```typescript
// Typed API calls
api.get<ResponseType>(path, options)
api.post<ResponseType, RequestType>(path, data, options)
api.put / api.patch / api.delete

// Options
{
  server?: boolean,      // For SSR calls
  authToken?: string,    // Override token
  params?: Record<string, string | number | boolean>
}
```

### Service Pattern

```typescript
export const ThreadService = {
    add: (apartmentId, dto) => api.post<ThreadInfoDTO, CreateThreadDTO>(...),
    get: (threadId) => api.get<ThreadInfoDTO>(...),
    getAll: (apartmentId, paging) => api.get<PagingRespDTO<ThreadInfoDTO>>(...),
    vote: (threadId, voteDTO) => api.post<ThreadVoteRespDTO, ThreadVoteDTO>(...),
}
```

**Server-Side Calls:** Prefix with `next` (e.g., `nextLogin`, `nextGetUserInfo`)

## React Query Patterns

### Query Key Convention

```typescript
['feature', 'type', identifier]
// Examples:
['threads', 'list', apartmentId]
['threads', 'detail', threadId]
['user']
['cars']
```

### Infinite Query (Lists)

```typescript
useInfiniteQuery({
    queryKey: ['threads', 'list', apartmentId],
    queryFn: async ({ pageParam = 0 }) => {
        const data = await ThreadService.getAll(apartmentId, { page: pageParam, size: 10 });
        // Cache individual items for optimistic updates
        data.content.forEach(thread => {
            queryClient.setQueryData(['threads', 'detail', thread.id], thread);
        });
        // Return only IDs in list (memory optimization)
        return { ...data, content: data.content.map(t => t.id) };
    },
    getNextPageParam: (lastPage) => lastPage.last ? null : lastPage.number + 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
})
```

### Optimistic Mutation Pattern

```typescript
useMutation({
    mutationFn: (data) => Service.action(data),
    onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey });
        const previous = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, optimisticData);
        return { previous };
    },
    onError: (err, variables, context) => {
        queryClient.setQueryData(queryKey, context?.previous);
        toast.error('Operation failed');
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Success!');
    },
})
```

## Form Handling

```typescript
const schema = z.object({
    title: z.string().min(1).max(100),
    body: z.string().max(2000),
    tags: z.array(z.string()).max(3),
});

const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', body: '', tags: [] },
});
```

## Authentication

### Flow
1. Login via `AuthService.login()` → sets `auth-token` cookie
2. `AuthProvider` fetches user on mount
3. Components use `useAuth()` or `useRequiredAuth()`

### Hooks

```typescript
const { user, isAuthenticated, isLoading, selectApartment } = useAuth();
const { user } = useRequiredAuth(); // Throws if not authenticated
```

**Protected Routes:** Handled by `proxy.ts` middleware

## Response Types

### Standard Success
```typescript
type SuccessResponse<T> = { success: true; data: T }
```

### Standard Error
```typescript
type ErrorResponse = { success: false; error: { key: string; message: string; code: number } }
```

### Pagination
```typescript
interface PagingRespDTO<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;      // Current page
    size: number;
    first: boolean;
    last: boolean;
}
```

## File Uploads

```typescript
// Protected file (apartment-specific)
FileService.uploadProtectedFile(apartmentId, file) → IdWrapperDTO

// Public file
FileService.uploadPublicFile(file) → IdWrapperDTO

// Limits: 10MB max, images + videos only
```

## Domain Knowledge

### Thread Tags
- ANNOUNCEMENT, QUESTION, DISCUSSION, ISSUE, SUGGESTION
- EVENT, URGENT, POLL, INFO, MAINTENANCE

### Polls
- Embedded in threads via `poll: PollDTO` property
- Voters tracked per option (`voters: UserSnapshotDTO[]`)
- Toggle voting (vote/unvote same option)
- Uses `usePollVote` hook with optimistic updates

### Reactions (Like/Dislike)
Reactions use the same poll system as regular polls:
- Stored in `reactions: PollDTO` on `ThreadInfoDTO`
- Option index 0 = Like, Option index 1 = Dislike
- Extensible: more reaction types can be added as poll options
- Uses `useReactionVote` hook (similar pattern to `usePollVote`)
- API: Same `pollVote` endpoint with reactions poll ID

```typescript
// Reading reactions
const likeOption = thread.reactions?.items?.[0];
const dislikeOption = thread.reactions?.items?.[1];
const isLiked = likeOption?.voters?.some(v => v.id === userId);
const likeCount = likeOption?.voteCount ?? 0;

// Voting
useReactionVote().mutate({
    apartmentId,
    reactionId: thread.reactions.id,
    optionId: likeOption.id,  // or dislikeOption.id
    threadId: thread.id
});
```

### Apartments
- Users can belong to multiple apartments
- `selectedApartment` in user context
- All content scoped to apartment

### Roles & Admin Access
Each apartment membership has a role: `'MEMBER' | 'ADMIN'`

```typescript
// Type definition (auth.dto.ts)
export type ApartmentRole = 'MEMBER' | 'ADMIN';

export interface ApartmentDTO {
    id: string;
    name: string;
    role: ApartmentRole;
}

// Checking admin privileges
const { user } = useAuth();
const isAdmin = user?.selectedApartment?.role === 'ADMIN';

// Conditional rendering
{isAdmin && <AdminOnlyComponent />}

// Conditional actions
const handleDelete = () => {
    if (user?.selectedApartment?.role !== 'ADMIN') return;
    // perform admin action
};
```

- Role is per-apartment (user can be ADMIN in one apartment, MEMBER in another)
- Always check against `selectedApartment.role`, not a global flag
- Backend returns role in user/me response within `joinedApartments[]`

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: >= 1024px

### Hook
```typescript
useDevice() → { type, isMobile, isTablet, isDesktop, width, height }
```

**Pattern:** `ResponsiveLayout` wrapper with separate mobile/tablet/desktop layouts

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `thread-card.tsx` |
| Components | PascalCase | `ThreadCard` |
| Hooks | camelCase + use | `useThread` |
| Constants | SCREAMING_SNAKE | `MAX_FILE_SIZE` |
| DTOs | PascalCase + DTO | `ThreadInfoDTO` |
| Services | PascalCase + Service | `ThreadService` |

## Import Alias

```typescript
// tsconfig paths
@/* → ./src/*

// Example
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/provider/AuthProvider';
```

## Provider Hierarchy

```
ReactQueryProvider
  └── MyThemeProvider (next-themes)
        └── AuthProvider
              └── ResponsiveLayout
                    └── ChatProvider
                          └── {children}
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/api-client.ts` | HTTP client with typed generics |
| `src/lib/utils.ts` | `cn()` utility, `formatTime()` |
| `src/proxy.ts` | Route protection middleware |
| `src/components/provider/AuthProvider.tsx` | Auth context & hooks |
| `src/components/provider/ReactQueryProvider.tsx` | Query client setup |
| `src/model/*.dto.ts` | Type definitions |
| `src/service/*.ts` | API service layer |
| `src/hooks/query/*` | React Query hooks |
