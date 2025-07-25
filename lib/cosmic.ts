import { createBucketClient } from '@cosmicjs/sdk'

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is required')
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY environment variable is required')
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

// Helper function for handling Cosmic SDK errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get stream settings
export async function getStreamSettings() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'stream-settings',
      slug: 'main-stream'
    }).props(['id', 'title', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch stream settings');
  }
}

// Get chat messages
export async function getChatMessages(limit: number = 50) {
  try {
    const response = await cosmic.objects.find({
      type: 'chat-messages',
      sort: '-created_at',
      limit
    }).props(['id', 'title', 'metadata', 'created_at']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch chat messages');
  }
}

// Get streamer profile
export async function getProfile() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'profiles',
      slug: 'jeff-profile'
    }).props(['id', 'title', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch profile');
  }
}

// Get featured videos
export async function getFeaturedVideos(limit: number = 6) {
  try {
    const response = await cosmic.objects.find({
      type: 'videos',
      'metadata.is_featured': true,
      sort: '-created_at',
      limit
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured videos');
  }
}

// Get site settings
export async function getSiteSettings() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'site-settings',
      slug: 'main-site'
    }).props(['id', 'title', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch site settings');
  }
}

// Add chat message
export async function addChatMessage(username: string, message: string, userColor: string = '#ffffff') {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'chat-messages',
      title: `${username}: ${message.substring(0, 50)}...`,
      metadata: {
        username,
        message,
        timestamp: new Date().toISOString(),
        user_color: userColor,
        is_moderator: false
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error adding chat message:', error);
    throw new Error('Failed to add chat message');
  }
}

// Update stream status
export async function updateStreamStatus(isLive: boolean, streamUrl?: string, streamTitle?: string) {
  try {
    const streamSettings = await getStreamSettings();
    
    if (!streamSettings) {
      throw new Error('Stream settings not found');
    }
    
    const response = await cosmic.objects.updateOne(streamSettings.id, {
      metadata: {
        ...streamSettings.metadata,
        is_live: isLive,
        stream_url: streamUrl || streamSettings.metadata?.stream_url,
        stream_title: streamTitle || streamSettings.metadata?.stream_title,
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error updating stream status:', error);
    throw new Error('Failed to update stream status');
  }
}