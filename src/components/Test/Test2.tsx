"use client";

import { flowers } from "@/assets";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import Alert from "../atoms/Alert";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";

export function Test2() {
  const [alertOpen, setAlertOpen] = useState(true);
  return (
    <div>
      <main className="flex flex-col  gap-[32px] items-center justify-center">
        <div className=" max-w-2xl my-4">
          <Alert open={alertOpen} onClose={() => setAlertOpen(false)} variant="success" icon={<MessageCircle />}>
            A dismissible alert for showing message.
            <div className="grid gap-3">
              <Button variant="outlined">Outlined button</Button>
              <Button variant="gradient" loading={false}>
                Gradient button
              </Button>
            </div>
          </Alert>
          <Alert open={alertOpen} onClose={() => setAlertOpen(false)} variant="error" icon={<MessageCircle />}>
            A dismissible alert for showing message.
            <div className="grid gap-3">
              <Button variant="outlined">Outlined button</Button>
              <Button variant="gradient" loading={false}>
                Gradient button
              </Button>
            </div>
          </Alert>
          <Alert open={alertOpen} onClose={() => setAlertOpen(false)}  icon={<MessageCircle />}>
            A dismissible alert for showing message.
            <div className="grid gap-3">
              <Button variant="outlined">Outlined button</Button>
              <Button variant="gradient" loading={false}>
                Gradient button
              </Button>
            </div>
          </Alert>
          <Alert open={alertOpen} onClose={() => setAlertOpen(false)} variant="info" icon={<MessageCircle />}>
            A dismissible alert for showing message.
            <div className="grid gap-3">
              <Button variant="outlined">Outlined button</Button>
              <Button variant="gradient" color="info" loading={false}>
                Gradient button
              </Button>
            </div>
          </Alert>

          <div className="grid gap-3 p-4 w-72">
            <Button variant="outlined">Outlined button</Button>
            <Button variant="gradient">Gradient button</Button>
            <Button variant="filled" loading>Filled button</Button>
            <Button variant="ghost">Ghost button</Button>
            <Button variant="text" color="error">
              Text Earror button
            </Button>
            <Button variant="text">Text Earror button</Button>
            <Button>Default button</Button>
            <Button color="success">Default Success button</Button>
            <Button color="error">Default Error button</Button>
            <Button color="info">Default Info button</Button>
            <Button color="success">Success button</Button>
            <Button variant="ghost" color="success">
              Ghost Success button
            </Button>
            <Button variant="ghost" color="error">
              Ghost Error button
            </Button>
            <Button variant="ghost" color="info">
              Ghost Info button
            </Button>
            <Button variant="outlined" color="success">
              Outline Success button
            </Button>

            <Button color="default" variant="filled">Default button</Button>
            <Button color="success" variant="filled">Default button</Button>
            <Button color="error" variant="filled">Default button</Button>
            <Button color="info" variant="filled">Default button</Button>
          </div>
        </div>
        <div className="grid gap-3 p-4 w-72">
          <Avatar src={flowers.src} width={500} height={500} alt="logo" />
        </div>
      </main>
    </div>
  );
}
