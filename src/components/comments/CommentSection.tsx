"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  IconHeart,
  IconMessageCircle,
  IconSend,
  IconDotsVertical,
  IconTrash,
  IconEdit,
  IconFlag,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react";

// Types
export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  pitchId?: string; // Made optional since it's not currently used
  initialComments?: Comment[];
  currentUser?: {
    id: string;
    name: string;
    avatar: string;
  };
}

// Helper function to format dates
const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Single Comment Component
const CommentItem = ({
  comment,
  currentUser,
  onReply,
  onLike,
  onDelete,
  onEdit,
  isReply = false
}: {
  comment: Comment;
  currentUser?: { id: string; name: string; avatar: string; };
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
  isReply?: boolean;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplies, setShowReplies] = useState(false);

  const isAuthor = currentUser?.id === comment.author.id;

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className={`${isReply ? 'ml-12 mt-3' : 'mb-6'}`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={comment.author.avatar}
              alt={comment.author.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>

        {/* Comment content */}
        <div className="flex-grow">
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 relative">
            {/* Author and timestamp */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{comment.author.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(comment.createdAt)}
                </p>
              </div>

              {/* Menu button */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <IconDotsVertical size={16} />
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 overflow-hidden"
                    >
                      <div className="py-1">
                        {isAuthor && (
                          <>
                            <button
                              onClick={handleEdit}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <IconEdit size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                onDelete(comment.id);
                                setShowMenu(false);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <IconTrash size={16} />
                              Delete
                            </button>
                          </>
                        )}
                        {!isAuthor && (
                          <button
                            onClick={() => setShowMenu(false)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <IconFlag size={16} />
                            Report
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Comment text */}
            {isEditing ? (
              <div className="mb-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/80 dark:bg-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2 text-sm">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 ${
                comment.isLiked
                  ? 'text-red-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <IconHeart size={16} fill={comment.isLiked ? "currentColor" : "none"} />
              <span>{comment.likes}</span>
            </button>

            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <IconMessageCircle size={16} />
              <span>Reply</span>
            </button>

            {comment.replies && comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showReplies ? (
                  <IconChevronUp size={16} />
                ) : (
                  <IconChevronDown size={16} />
                )}
                <span>{comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
              </button>
            )}
          </div>

          {/* Replies */}
          <AnimatePresence>
            {showReplies && comment.replies && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-3 overflow-hidden"
              >
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    currentUser={currentUser}
                    onReply={onReply}
                    onLike={onLike}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    isReply={true}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Comment Section Component
export const CommentSection: React.FC<CommentSectionProps> = ({
  // pitchId is currently unused but kept in the interface for future implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pitchId,
  initialComments = [],
  currentUser = {
    id: "current-user",
    name: "You",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState(initialComments.length);

  // Handle adding a new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: currentUser,
      content: newComment,
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    if (replyingTo) {
      // Add as a reply
      const updatedComments = comments.map(c => {
        if (c.id === replyingTo) {
          return {
            ...c,
            replies: [...(c.replies || []), comment]
          };
        }
        return c;
      });

      setComments(updatedComments);
      setReplyingTo(null);
    } else {
      // Add as a new comment
      setComments([comment, ...comments]);
      setCommentCount(prev => prev + 1);
    }

    setNewComment("");
  };

  // Handle liking a comment
  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }

        // Check in replies
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        }

        return comment;
      })
    );
  };

  // Handle deleting a comment
  const handleDeleteComment = (commentId: string) => {
    // Check if it's a top-level comment
    const isTopLevel = comments.some(c => c.id === commentId);

    if (isTopLevel) {
      setComments(comments.filter(c => c.id !== commentId));
      setCommentCount(prev => prev - 1);
    } else {
      // It's a reply, find the parent comment
      setComments(
        comments.map(comment => {
          if (comment.replies?.some(r => r.id === commentId)) {
            return {
              ...comment,
              replies: comment.replies.filter(r => r.id !== commentId)
            };
          }
          return comment;
        })
      );
    }
  };

  // Handle editing a comment
  const handleEditComment = (commentId: string, newContent: string) => {
    setComments(
      comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: newContent
          };
        }

        // Check in replies
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  content: newContent
                };
              }
              return reply;
            })
          };
        }

        return comment;
      })
    );
  };

  return (
    <div className="mt-12">
      <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <IconMessageCircle size={24} />
          Comments ({commentCount})
        </h2>

        {/* Comment input */}
        <div className="mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-grow">
              {replyingTo && (
                <div className="mb-2 text-sm text-blue-600 dark:text-blue-400 flex items-center justify-between">
                  <span>Replying to a comment</span>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="flex items-center gap-2"
                >
                  <IconSend size={16} />
                  {replyingTo ? "Reply" : "Comment"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Be the first to comment on this pitch!</p>
            </div>
          ) : (
            comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                onReply={setReplyingTo}
                onLike={handleLikeComment}
                onDelete={handleDeleteComment}
                onEdit={handleEditComment}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommentSection;
