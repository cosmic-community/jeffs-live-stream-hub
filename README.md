# Jeff's Live Stream Hub

![App Preview](https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=300&fit=crop&auto=format)

A personal live streaming platform built for content creators who want their own dedicated streaming website. Features real-time video streaming, interactive chat, and a clean, professional design that works perfectly on desktop and mobile.

## Features

- 📺 **Live Video Streaming** - Real-time video player with adaptive quality
- 💬 **Interactive Live Chat** - Community engagement with real-time messaging
- 📱 **Mobile Responsive** - Optimized for all screen sizes and devices
- 👤 **Personal Branding** - Customizable profile, bio, and social media links
- 🎬 **Stream Status Management** - Shows live stream or offline content automatically
- 🔗 **Social Integration** - Direct links to YouTube, X, and other platforms
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🎨 **Modern Design** - Clean, dark theme perfect for streaming content

## Clone this Bucket

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6883b34245a59f0b52cf886f&clone_repository=6883b5fe45a59f0b52cf8875)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to create a twitch clone where I can have my webcam showing me in the top screen and another screen below where I can have my screen showing. On the side I want there to be a chat function that allows viewers to comment during the live stream. I want to be able to be able to login on the backend for me to have access to all of the tools (screen sharing, web cam, comments) and also a user facing side that has these three things neatly displayed. Do you know how to do this? "

### Code Generation Prompt

> I want to build a personal live streaming website where I'm the only streamer. Here's what I need:
> 	1.	Homepage:
> 	•	A clean, simple layout
> 	•	Shows my live stream when I'm streaming
> 	•	If I'm not live, show a message like "Jeff is currently offline" or a past video
> 	2.	Live Video Player:
> 	•	Visitors can watch my stream in real-time
> 	•	Should work on desktop and mobile
> 	3.	Live Chat
> 	•	A basic chat next to the video so viewers can talk while watching
> 	4.	About Section:
> 	•	A short bio or description about me and what I stream
> 	5.	Simple Header/Footer:
> 	•	Logo or name of the site
> 	•	Links to my socials (YouTube, X, etc.)

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **WebSocket** - Real-time chat functionality
- **React Server Components** - Optimized performance

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Stream Status
```typescript
import { cosmic } from '@/lib/cosmic'

const streamStatus = await cosmic.objects.findOne({
  type: 'stream-settings',
  slug: 'main-stream'
}).props(['title', 'metadata'])

const isLive = streamStatus.object?.metadata?.is_live || false
```

### Managing Chat Messages
```typescript
const chatMessages = await cosmic.objects.find({
  type: 'chat-messages',
  sort: '-created_at',
  limit: 50
}).props(['title', 'metadata', 'created_at'])
```

### Updating Stream Settings
```typescript
await cosmic.objects.updateOne('stream-settings-id', {
  metadata: {
    is_live: true,
    stream_url: 'your-stream-url',
    stream_title: 'Live Now!'
  }
})
```

## Cosmic CMS Integration

This application uses several Cosmic object types:

- **Stream Settings** - Manages live status, stream URLs, and titles
- **Chat Messages** - Stores and displays real-time chat messages
- **Profile** - Contains streamer bio, avatar, and social media links
- **Videos** - Past streams and featured content for offline display
- **Site Settings** - Global configuration and branding options

The content structure allows for easy management of all streaming content through Cosmic's intuitive dashboard, with real-time updates reflected immediately on the website.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically with each push to main

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in the Netlify dashboard
3. Set build command to `bun run build`
4. Set publish directory to `.next`

### Environment Variables for Production
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->