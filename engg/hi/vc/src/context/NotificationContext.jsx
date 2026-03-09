import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our notification structure
// Notification: { id: string, type: 'alert' | 'message' | 'reminder', message: string, read: boolean, timestamp: string }

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Load existing notifications from localStorage (if any)
        const stored = localStorage.getItem('app_notifications');
        if (stored) {
            const parsed = JSON.parse(stored);
            setNotifications(parsed);
            setUnreadCount(parsed.filter(n => !n.read).length);
        }
    }, []);

    const addNotification = (type, message) => {
        const newNotif = {
            id: Date.now().toString(),
            type,
            message,
            read: false,
            timestamp: new Date().toISOString()
        };

        setNotifications(prev => {
            const updated = [newNotif, ...prev].slice(0, 50); // Keep max 50
            localStorage.setItem('app_notifications', JSON.stringify(updated));
            return updated;
        });
        setUnreadCount(prev => prev + 1);
    };

    const markAsRead = (id) => {
        setNotifications(prev => {
            const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
            localStorage.setItem('app_notifications', JSON.stringify(updated));
            setUnreadCount(updated.filter(n => !n.read).length);
            return updated;
        });
    };

    const markAllAsRead = () => {
        setNotifications(prev => {
            const updated = prev.map(n => ({ ...n, read: true }));
            localStorage.setItem('app_notifications', JSON.stringify(updated));
            setUnreadCount(0);
            return updated;
        });
    };

    const clearNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
        localStorage.removeItem('app_notifications');
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            clearNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
