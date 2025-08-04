import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MdNotificationsNone } from 'react-icons/md';
import { Button } from './button';
import { Animal } from '@/types/animal';
import { User } from '@/types/user';
import { Notification } from '@/types/notification';
import Link from 'next/link';

interface TableProps {
  animals: Animal[];
  users: User[];
  notifications: Notification[];
}

export const NotificationComponent: React.FC<TableProps> = ({
  animals,
  users,
  notifications,
}) => {
  console.log('notifications: ', notifications);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="relative flex gap-1 p-1 py-0">
            <MdNotificationsNone className="size-5" />
            {notifications.length === 0 ? (
              ''
            ) : (
              <Badge className="absolute right-0 top-0 rounded-full bg-destructive p-0 px-1">
                {notifications.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {(notifications ?? []).map(
            (notification: Notification, index: number) => (
              <DropdownMenuItem
                key={index}
                className={`text-xs ${notification.read && 'bg-foreground'}`}
              >
                <Link href={`dashboard/${notification.userId}`}>
                  {notification.message}
                </Link>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
