"use client";

import cn from "@/lib/cn";
import { Bell, Copy, Edit, LogOut, MoreVertical, Settings, Trash, User } from "lucide-react";
import { ComponentProps } from "react";
import Menu from "./index";

export default function MenuExample({ className, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("flex flex-col gap-12 p-8 bg-red-500/20", className)}>
      <h1 className="text-2xl font-bold">Menu Component Examples</h1>

      {/* Basic Menu */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Basic Menu</h2>
        <Menu>
          <Menu.Trigger>Options</Menu.Trigger>
          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item divide>Settings</Menu.Item>

            <Menu.Item>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      {/* Menu with Icons */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Menu with Icons</h2>
        <Menu>
          <Menu.Trigger>Account</Menu.Trigger>
          <Menu.Dropdown width="md">
            <Menu.Item icon={<User className="h-4 w-4" />}>My Profile</Menu.Item>
            <Menu.Item icon={<Settings className="h-4 w-4" />}>Settings</Menu.Item>
            <Menu.Item divide icon={<Bell className="h-4 w-4" />}>
              Notifications
            </Menu.Item>

            <Menu.Item icon={<LogOut className="h-4 w-4" />} className="text-red-500">
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      {/* Menu with Keyboard Shortcuts */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Menu with Keyboard Shortcuts</h2>
        <Menu>
          <Menu.Trigger>Edit</Menu.Trigger>
          <Menu.Dropdown width="md">
            <Menu.Item icon={<Copy className="h-4 w-4" />} shortcut="⌘C">
              Copy
            </Menu.Item>
            <Menu.Item divide icon={<Edit className="h-4 w-4" />} shortcut="⌘E">
              Edit
            </Menu.Item>
            <Menu.Item icon={<Trash className="h-4 w-4" />} className="text-red-500" shortcut="⌘⌫">
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      {/* Placement Examples */}
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-xl font-semibold">Different Placements</h2>
        <div className="grid grid-cols-3 gap-4 w-full">
          <Menu>
            <Menu.Trigger>Bottom Start</Menu.Trigger>
            <Menu.Dropdown width="md" placement="bottom-start">
              <Menu.Item>Option 1</Menu.Item>
              <Menu.Item>Option 2</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu>
            <Menu.Trigger>Bottom</Menu.Trigger>
            <Menu.Dropdown width="md" placement="bottom">
              <Menu.Item>Option 1</Menu.Item>
              <Menu.Item>Option 2</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu>
            <Menu.Trigger>Bottom End</Menu.Trigger>
            <Menu.Dropdown width="md" placement="bottom-end">
              <Menu.Item>Option 1</Menu.Item>
              <Menu.Item>Option 2</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      {/* Icon Button Trigger */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Icon Button Menu</h2>
        <Menu>
          <Menu.Trigger asChild>
            <MoreVertical className="h-5 w-5" />
          </Menu.Trigger>
          <Menu.Dropdown width="sm">
            <Menu.Item icon={<Edit className="h-4 w-4" />}>Edit</Menu.Item>
            <Menu.Item divide icon={<Copy className="h-4 w-4" />}>
              Duplicate
            </Menu.Item>

            <Menu.Item icon={<Trash className="h-4 w-4" />} className="text-red-500">
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}
