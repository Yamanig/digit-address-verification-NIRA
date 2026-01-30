# digit-address-verification-NIRA
Build a production-ready platform skeleton for a digital address verification service that connects PlusCodes with NIRA Somalia identity system. The design must be stunning, ultra-modern, and intuitive with smooth animations, interactive cards, and a visual workflow builder.

Tech Stack & Versions (Strict)
•	Framework: Next.js 16.0.0 (App Router)
•	React: 19.2.0 (use Action, use Optimistic, Server Components)
•	Styling: Tailwind CSS 4.0.0 (with @theme directives)
•	UI Components: shadcn/ui latest (Radix UI primitives)
•	Forms: React Hook Form 7.53.0
•	Validation: Zod 3.23.0
•	Workflows: React Flow 12.3.0 (React Flow Re)
•	Animations: Framer Motion 11.11.0
•	Maps: Google Maps JavaScript API + @googlemaps/extended-component-library


Design Philosophy & Visual Language
•	Aesthetic: Minimalist brutalism meets Somali blue & white with surgical accent colors
•	Typography: Inter for body, Manrope for headings (via next/font)
•	Colors:
•	Primary: #0077b6 (Somali Blue)
•	Accent: #e63946 (PlusCode Red)
•	Success: #2a9d8f
•	Background: #fafbfc (off-white)
•	Text: #1a1a1a (near-black)
•	Motion: Spring physics (stiffness: 100, damping: 15), staggered reveals, morphing shapes
•	Layout: Grid-aligned, container-based with max-w-7xl + px-4 sm:px-6 lg:px-8
•	Cards: Glassmorphism effect (backdrop-blur-sm bg-white/80), subtle border, hover lift with shadow expansion

Architecture Patterns
1.	Server Components First: All data fetching in Server Components
2.	Streaming: Use <Suspense> boundaries with custom fallbacks
3.	Actions: Server Actions for mutations (no API routes unless needed for webhooks)
4.	Parallel Routes: For modal overlays and sidebar panels
5.	Intercepting Routes: For drill-down views (card → detail slide-over)
6.	Edge Runtime: For public pages and auth routes

Required Core Components (Build These First)
1. Animated Card Container (/components/ui/animated-card.tsx)
•	Props: children, index, layoutId, hoverScale?: 1.02
•	Features:
•	Initial load: Staggered fade-up animation (useAnimate hook)
•	Hover: Scale up, border color morphs blue → red, soft glow shadow
•	Tap: Scale down 0.98 with haptic feel
•	Entrance: opacity: 0, y: 20 → opacity: 1, y: 0 with spring

•	2. Sliding Cards Carousel (/components/ui/sliding-cards.tsx)
•	Use Case: Showcase features, testimonials, or verified addresses
•	Features:
•	Auto-advance every 4s, pause on hover
•	Drag-to-scroll with snap points
•	Progress dots that morph on active state
•	Cards slide horizontally with layout animation magic
•	Dynamic height adjustment with AnimatePresence
•	
3. React Flow Workflow Builder (/components/workflow/workflow-builder.tsx)
•	Use Case: Visual automation builder for address verification pipelines
•	Features:
•	Custom nodes: "Trigger", "NIRA Verify", "If/Then", "Send Webhook"
•	Smooth bezier edges with gradient strokes
•	Mini map + controls panel
•	Animated node states (processing = pulsing blue ring)
•	Drag-and-drop from sidebar node palette
•	Save/load workflow as JSON to backend
Platform Dashboard (/app/platform/dashboard/page.tsx)
Layout: Sidebar + top nav + main content
•	Sidebar: Collapsible, uses motion.AnimatePresence for smooth collapse
•	Main Grid:
•	Left: Map with address pins (clustered at zoom < 14)
•	Right: Animated card list of recent addresses
•	Bottom: Workflow status widgets
12. Success Metrics for Skeleton
•	✅ All pages load with staggered animations
•	✅ Cards slide smoothly and respond to drag
•	✅ React Flow renders with animated edges
•	✅ Forms validate with Zod and show real-time errors
•	✅ Page transitions are fluid
•	✅ Navigation morphs on active state
•	✅ Mobile responsive (card grid collapses to 1 col)
•	✅ Performance: Lighthouse 95+ on all metrics

<img width="468" height="635" alt="image" src="https://github.com/user-attachments/assets/14cc182d-4c1c-4cdb-a1e1-bb24fa97b294" />
