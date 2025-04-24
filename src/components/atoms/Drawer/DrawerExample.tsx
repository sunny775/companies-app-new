import React, { useState} from 'react';
import Drawer from './index';
import Button from '../Button';
import { X } from 'lucide-react';
import IconButton from '../IconButton';
import Input from '../Input';

export default function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("right");

  const openDrawer = (pos: "left" | "right") => {
    setPosition(pos);
    setIsOpen(true);
  };

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => openDrawer("left")}>Open Left Drawer</Button>
        <Button onClick={() => openDrawer("right")}>Open Right Drawer</Button>
      </div>

      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        position={position}
        size="md"
      >
        <Drawer.Header>
          <h2 id="drawer-title" className="text-lg font-semibold">
            MENU
          </h2>
          <IconButton
            onClick={() => setIsOpen(false)}
            aria-label="Close drawer"
            
          >
            <X className="w-6 h-6 stroke-1" />
          </IconButton>
        </Drawer.Header>
        
        <Drawer.Body>
          <p className="mb-4">This is an accessible drawer component, that follows best practices.</p>
          
          <div className="space-y-4">
            <div>
              <Input
              errorMessage="Input has error message"
                type="text" 
                name="name"
                placeholder="Enter your name" 
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
            
              <Input
                type="email" 
                id="email"
                placeholder="Enter your email" 
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="pt-4">
              <Button >Submit</Button>
            </div>
          </div>
        </Drawer.Body>
        
        <Drawer.Footer>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Apply
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
}