import React, { useEffect, useCallback, useState } from "react";
import { X, CheckCircle2, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

import { markNotificationAsRead } from "../../lib/api/Notification";
import {
  getIncomingRequests,
  acceptAssignmentRequest,
} from "../../lib/api/User";

import { useNotificationStore } from "../../store/useNotificationStore";
import { playNotificationSound } from "../../lib/playNotificationSound";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const NotificationItem = ({ id, title, body, read, onMarkRead, onDismiss }) => (
  <motion.div
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    layout
    className={`flex items-start gap-4 p-4 rounded-xl shadow-lg transition-all ${
      read ? "bg-muted" : "bg-primary text-primary-foreground"
    }`}
  >
    <div className="flex-1">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm">{body}</p>
    </div>
    <div className="flex items-center gap-2">
      {!read && (
        <button onClick={() => onMarkRead(id)} title="Mark as Read">
          <CheckCircle2 className="w-5 h-5 text-white hover:text-green-300" />
        </button>
      )}
      <button onClick={() => onDismiss(id)} title="Dismiss">
        <X
          className={`w-5 h-5 ${
            read
              ? "text-black hover:text-gray-600"
              : "text-white hover:text-red-300"
          }`}
        />
      </button>
    </div>
  </motion.div>
);

const RequestDialog = ({ open, onClose, requests, onAcceptRequest }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">
          Assignment Requests
        </h2>
        {requests.length === 0 ? (
          <p className="text-muted-foreground">No requests yet!</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <Card
                key={req._id}
                className="flex p-4 gap-4 rounded-lg shadow-md hover:shadow-lg"
              >
                <Avatar src={req.avatar} alt={req.name} size="lg" />
                <div>
                  <p className="font-semibold text-lg">{req.name}</p>
                  <p className="text-sm text-gray-600">
                    {req.message || "Wants to assign you a video."}
                  </p>
                  <Button
                    onClick={() => onAcceptRequest(req._id)}
                    className="mt-2 bg-blue-600 text-white w-full hover:bg-blue-700"
                  >
                    Accept Request
                  </Button>
                </div>
              </Card>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

const NotificationCenterPanel = () => {
  const {
    notifications,
    fetchAndSetNotifications,
    markRead,
    removeNotification,
    addNotification,
  } = useNotificationStore();

  const [showRequests, setShowRequests] = useState(false);
  const [assignmentRequests, setAssignmentRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    fetchAndSetNotifications();

    const socket = new WebSocket("ws://localhost:8080/ws");
    socket.onmessage = (event) => {
      const newNotif = JSON.parse(event.data);
      addNotification(newNotif);
      playNotificationSound();
    };

    return () => socket.close();
  }, [fetchAndSetNotifications]);

  const handleMarkRead = useCallback(
    async (id) => {
      const res = await markNotificationAsRead(id);
      if (res.success) markRead(id);
    },
    [markRead]
  );

  const handleDismiss = useCallback(
    (id) => removeNotification(id),
    [removeNotification]
  );

  const handleViewRequests = async () => {
    setShowRequests(true);
    try {
      const res = await getIncomingRequests();
      if (res?.success) {
        const formatted = res.requests.map((req) => ({
          _id: req.id,
          name: req.users.name,
          avatar: req.users.avatar,
          message: req.message,
        }));
        setAssignmentRequests(formatted);
        setRequestCount(formatted.length);
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    const res = await acceptAssignmentRequest(requestId);
    if (res.success) {
      setAssignmentRequests((prev) => prev.filter((r) => r._id !== requestId));
      setRequestCount((prev) => Math.max(prev - 1, 0));
      alert("Request accepted!");
    }
  };

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Notification Center</h2>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="text-sm font-semibold text-red-500">
              {unreadCount} New
            </span>
          )}
          <Button
            onClick={handleViewRequests}
            className="flex items-center gap-1 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Users className="w-5 h-5" />
            Requests
            {requestCount > 0 && (
              <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-1">
                {requestCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {notifications.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground"
          >
            You're all caught up! 🎉
          </motion.p>
        ) : (
          notifications.map((n) => (
            <NotificationItem
              key={n.id}
              {...n}
              onMarkRead={handleMarkRead}
              onDismiss={handleDismiss}
            />
          ))
        )}
      </AnimatePresence>

      <RequestDialog
        open={showRequests}
        onClose={() => setShowRequests(false)}
        requests={assignmentRequests}
        onAcceptRequest={handleAcceptRequest}
      />
    </div>
  );
};

export default NotificationCenterPanel;
