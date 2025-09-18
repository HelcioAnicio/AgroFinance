import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MdNotificationsNone } from 'react-icons/md';
import { Notification } from '@/types/notification';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface TableProps {
  notifications: Notification[];
}

export const NotificationComponent: React.FC<TableProps> = ({
  notifications,
}) => {
  const [listNotifications, setListNotifications] = useState<Notification[]>(
    []
  );

  useEffect(() => {
    if (Array.isArray(notifications)) {
      const sortedNotifications = [...notifications].sort((a, b) => {
        const aDate = a.notifyAt;
        const bDate = b.notifyAt;

        if (aDate && bDate) {
          return new Date(bDate).getTime() - new Date(aDate).getTime();
        } else if (aDate) {
          return -1;
        } else if (bDate) {
          return 1;
        } else {
          return 0;
        }
      });
      setListNotifications(sortedNotifications);
    } else {
      setListNotifications([]);
    }
  }, [notifications]);

  const handleStateRead = async (notificationClicked: Notification) => {
    try {
      await axios.put(
        `/api/updateNotificationRead?id=${notificationClicked.id}`,
        notificationClicked,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch {
      toast.error('Erro ao tentar marcar como lido');
    }
  };

  const today = new Date();

  const notificationsUnread = (listNotifications ?? []).filter(
    (notification: Notification) => {
      const notifyAtDate = notification.notifyAt
        ? new Date(notification.notifyAt)
        : null;
      return notifyAtDate && notifyAtDate <= today;
    }
  );
  console.log('notificationsUnread: ', notificationsUnread);

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="relative flex gap-1 rounded-sm bg-primary p-1 py-2">
          <MdNotificationsNone className="size-5 text-background" />
          {notificationsUnread.filter(
            (notification: Notification) => notification.read === false
          ).length > 0 && (
            <Badge className="absolute right-0 top-0 rounded-full bg-destructive p-0 px-1">
              {
                notificationsUnread.filter(
                  (notification: Notification) => notification.read === false
                ).length
              }
            </Badge>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-full min-w-0 max-w-72 flex-col justify-end">
          {(notificationsUnread ?? []).map(
            (notification: Notification, index: number) => (
              <Link
                href={`dashboard/${notification.animalId}`}
                key={index}
                onClick={() => handleStateRead(notification)}
              >
                <DropdownMenuItem
                  className={`w-full text-xs ${notification.read === false ? 'bg-secondary text-background hover:bg-secondary' : 'bg-background hover:bg-background'}`}
                >
                  {notification && (
                    <span className="h-2 w-4 rounded-full bg-background"></span>
                  )}
                  {notification.message}
                  (notification.notifyAt)
                </DropdownMenuItem>
              </Link>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
