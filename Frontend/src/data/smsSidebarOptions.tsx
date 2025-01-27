import BasketMailSmsSettings from "@/components/admin-panel/sidebar/extra/extra/SendMailSmsSettings/mail-sms/BasketMailSmsSettings";
import MessagesSentSettings from "@/components/admin-panel/sidebar/extra/extra/SendMailSmsSettings/mail-sms/MessagesSentSettings";
import NewMessage from "@/components/admin-panel/sidebar/extra/extra/SendMailSmsSettings/mail-sms/NewMessage";
import OnHoldMailSmsSettings from "@/components/admin-panel/sidebar/extra/extra/SendMailSmsSettings/mail-sms/OnHoldMailSmsSettings";
import { Mail, Clock, Trash, PenBox } from "lucide-react"; // Importing icons for the sidebar

export const smsSidebarOptions  = [
    {
        name: "Mail/SMS",
        subOptions: [
            {
                name: "New Message",
                path: "/extra/send-mail/new-message",
                icon: PenBox, // Icon for Messages Sent
                component: NewMessage, // Component for this route
              },
          {
            name: "Messages Sent",
            path: "/extra/send-mail/messages-sent",
            icon: Mail, // Icon for Messages Sent
            component: MessagesSentSettings, // Component for this route
          },
          {
            name: "On Hold",
            path: "/extra/send-mail/on-hold",
            icon: Clock, // Icon for On Hold
            component: OnHoldMailSmsSettings, // Component for this route
          },
          {
            name: "Basket",
            path: "/extra/send-mail/basket",
            icon: Trash, // Icon for Basket
            component: BasketMailSmsSettings, // Component for this route
          },
        ],
      },
];

