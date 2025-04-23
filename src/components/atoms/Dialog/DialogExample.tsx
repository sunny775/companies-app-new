"use client";

import React, { useState } from 'react';
import Dialog from './DialogNew';

const DialogExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <button 
        onClick={openDialog}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Open Dialog
      </button>

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
          <p>This is an example of our new dialog component using the native HTML dialog element.</p>
          <p>It comes with improved accessibility, performance, and follows best practices.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <button 
            onClick={closeDialog}
            className="px-4 py-2 mr-2  hover:bg-gray-50 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={closeDialog}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Confirm
          </button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
};

export default DialogExample;