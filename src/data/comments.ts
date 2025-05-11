import { Comment } from "@/components/comments/CommentSection";

// Helper function to create dates in the past
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const hoursAgo = (hours: number): Date => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date;
};

// Uncomment when needed
// const minutesAgo = (minutes: number): Date => {
//   const date = new Date();
//   date.setMinutes(date.getMinutes() - minutes);
//   return date;
// };

// Mock comments data for each pitch
export const MOCK_COMMENTS: Record<string, Comment[]> = {
  // EcoDelivery (Pitch ID: 1)
  "1": [
    {
      id: "comment-1",
      author: {
        id: "user-1",
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "This is exactly what our city needs! Have you considered partnering with local restaurants for their delivery needs? I think there's a huge opportunity there.",
      createdAt: daysAgo(2),
      likes: 15,
      isLiked: false,
      replies: [
        {
          id: "comment-1-reply-1",
          author: {
            id: "user-2",
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "I agree! I run a small restaurant and we're looking for more sustainable delivery options. Would love to connect.",
          createdAt: daysAgo(1),
          likes: 8,
          isLiked: true,
        },
        {
          id: "comment-1-reply-2",
          author: {
            id: "pitch-author",
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "Thanks for the suggestion, Emma! We're actually in talks with several local restaurants already. Would love to chat more about your ideas!",
          createdAt: hoursAgo(20),
          likes: 5,
          isLiked: false,
        }
      ]
    },
    {
      id: "comment-2",
      author: {
        id: "user-3",
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "What's your plan for scaling this beyond the initial city? I'm curious about the logistics of expanding to multiple regions while maintaining the eco-friendly approach.",
      createdAt: daysAgo(1),
      likes: 7,
      isLiked: false,
    },
    {
      id: "comment-3",
      author: {
        id: "user-4",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "I love the focus on sustainability! Have you calculated the carbon footprint reduction compared to traditional delivery services?",
      createdAt: hoursAgo(10),
      likes: 12,
      isLiked: true,
    },
  ],

  // MindfulAI (Pitch ID: 2)
  "2": [
    {
      id: "comment-1",
      author: {
        id: "user-5",
        name: "Dr. Rebecca Lee",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "As a mental health professional, I'm excited about the potential of this technology. Have you consulted with clinical psychologists during development?",
      createdAt: daysAgo(3),
      likes: 24,
      isLiked: false,
      replies: [
        {
          id: "comment-1-reply-1",
          author: {
            id: "pitch-author",
            name: "Emily Zhang",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "Yes, we have a team of clinical psychologists on our advisory board. We'd love to get your input as well if you're interested!",
          createdAt: daysAgo(2),
          likes: 10,
          isLiked: false,
        }
      ]
    },
    {
      id: "comment-2",
      author: {
        id: "user-6",
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "How are you handling data privacy? Mental health information is extremely sensitive.",
      createdAt: hoursAgo(36),
      likes: 18,
      isLiked: true,
    },
  ],

  // UrbanFarm (Pitch ID: 3)
  "3": [
    {
      id: "comment-1",
      author: {
        id: "user-7",
        name: "Maria Rodriguez",
        avatar: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "This could revolutionize urban food production! What crops have you found work best in your vertical farming setup?",
      createdAt: daysAgo(5),
      likes: 21,
      isLiked: false,
    },
    {
      id: "comment-2",
      author: {
        id: "user-8",
        name: "Thomas Green",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "I'm working on a similar concept for my community garden. Would love to collaborate and share insights!",
      createdAt: daysAgo(3),
      likes: 9,
      isLiked: false,
      replies: [
        {
          id: "comment-2-reply-1",
          author: {
            id: "pitch-author",
            name: "Carlos Mendez",
            avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "That sounds great, Thomas! Let's connect offline and discuss potential collaboration opportunities.",
          createdAt: daysAgo(2),
          likes: 4,
          isLiked: true,
        }
      ]
    },
  ],

  // MedConnect (Pitch ID: 4)
  "4": [
    {
      id: "comment-1",
      author: {
        id: "user-9",
        name: "Dr. Aisha Patel",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: "As a physician, I see tremendous potential in this platform. How are you handling cross-border medical licensing issues?",
      createdAt: hoursAgo(48),
      likes: 16,
      isLiked: false,
    },
  ],

  // Default empty comments for any other pitch
  "default": []
};
