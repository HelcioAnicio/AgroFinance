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

interface TableProps {
  notifications: Notification[];
}

export const NotificationComponent: React.FC<TableProps> = ({
  notifications,
}) => {
  console.log('notifications: ', notifications);
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

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative flex gap-1 rounded-sm bg-primary p-1 py-2">
          <MdNotificationsNone className="size-5 text-background" />
          {notifications?.length >= 0 && (
            <Badge className="absolute right-0 top-0 rounded-full bg-destructive p-0 px-1">
              {
                (listNotifications ?? []).filter(
                  (notification: Notification) => notification.read === false
                ).length
              }
            </Badge>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-full min-w-0 max-w-72 items-center justify-end">
          {(listNotifications ?? []).map(
            (notification: Notification, index: number) => (
              <Link href={`dashboard/${notification.animalId}`} key={index}>
                <DropdownMenuItem
                  className={`w-full text-xs ${notification.read === false ? 'bg-secondary text-background hover:bg-secondary' : 'bg-background hover:bg-background'}`}
                >
                  {notification.read === false && (
                    <span className="h-2 w-4 rounded-full bg-background"></span>
                  )}
                  {notification.message}
                </DropdownMenuItem>
              </Link>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
