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
import { Check, Trash2 } from 'lucide-react';

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
        `/api/updateNotificationRead?id=${notificationClicked.id}`
      );
      setListNotifications((prev) =>
        prev.map((item) =>
          item.id === notificationClicked.id ? { ...item, read: true } : item
        )
      );
    } catch {
      toast.error('Erro ao tentar marcar como lido');
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await axios.delete(`/api/updateNotificationRead?id=${notificationId}`);
      setListNotifications((prev) =>
        prev.filter((item) => item.id !== notificationId)
      );
      toast.success('Notificacao excluida');
    } catch {
      toast.error('Erro ao tentar excluir notificacao');
    }
  };

  const now = new Date();

  const visibleNotifications = (listNotifications ?? []).filter(
    (notification: Notification) => {
      const notifyAtDate = notification.notifyAt
        ? new Date(notification.notifyAt)
        : null;
      return !notifyAtDate || notifyAtDate <= now;
    }
  );

  const unreadNotifications = visibleNotifications.filter(
    (notification: Notification) => notification.read === false
  );

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="relative flex gap-1 rounded-sm bg-primary p-1 py-2">
          <MdNotificationsNone className="size-5 text-background" />
          {unreadNotifications.length > 0 && (
            <Badge className="absolute right-0 top-0 rounded-full bg-destructive p-0 px-1">
              {unreadNotifications.length}
            </Badge>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-full min-w-0 max-w-72 flex-col justify-end gap-3">
          {visibleNotifications.length === 0 && (
            <DropdownMenuItem className="text-xs text-muted-foreground">
              Nenhuma notificacao
            </DropdownMenuItem>
          )}

          {visibleNotifications.map((notification: Notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex w-full items-center justify-between gap-2 text-xs ${notification.read === false ? 'bg-secondary text-background hover:bg-secondary' : 'bg-background hover:bg-background'}`}
            >
              <Link
                href={notification.animalId ? `/dashboard/${notification.animalId}` : `/dashboard/profile`}
                className="flex min-w-0 flex-1 items-center gap-2"
                onClick={() => handleStateRead(notification)}
              >
                {notification.read === false && (
                  <span className="h-2 w-2 rounded-full bg-background"></span>
                )}
                <span className="truncate">{notification.message}</span>
              </Link>
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <button
                    type="button"
                    aria-label="Marcar notificacao como lida"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      void handleStateRead(notification);
                    }}
                    className="rounded-sm p-1 transition-colors hover:bg-primary/20"
                  >
                    <Check className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Excluir notificacao"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void handleDeleteNotification(notification.id);
                  }}
                  className="rounded-sm p-1 transition-colors hover:bg-destructive/20"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
