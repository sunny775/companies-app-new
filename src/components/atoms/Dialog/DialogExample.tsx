"use client";

import React, { useState } from 'react';
import Dialog from './index';
import Button from '../Button';

const DialogExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Button
        onClick={openDialog}
        color='info'
      >
        Open Dialog
      </Button>

      <Dialog 
        open={isOpen} 
        onClose={closeDialog}
        size="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <Dialog.Header id="dialog-title">
          Example Dialog
        </Dialog.Header>
        <Dialog.Body id="dialog-description">
          <p>This is an example of the custom dialog component</p>
          <p>It comes with improved accessibility, performance, and follows best practices.</p>
        </Dialog.Body>
        <Dialog.Footer className='gap-2'>
          <Button 
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button 
            onClick={closeDialog}
            variant='gradient'
            color='info'
          >
            Confirm
          </Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
};

export default DialogExample;