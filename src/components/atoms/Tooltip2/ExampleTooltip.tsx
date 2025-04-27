import React from 'react';
import Tooltip from './index';
import Button from '../Button'; // Assuming you have a Button component

const App = () => {
  return (
    <div className="p-8">
      <Tooltip content="This is a helpful tooltip">
        {(props) => <Button {...props}>Hover over me</Button>}
      </Tooltip>
      
      <Tooltip content="Tooltip on the right" position="right">
        {(props) => <div {...props} className="p-2 border">Custom element with tooltip</div>}
      </Tooltip>
      
      {/* For specific HTML element types like HTMLButtonElement */}
      <Tooltip content="Button with strongly typed props">
        {(props: ChildrenProps<HTMLButtonElement>) => (
          <button 
            {...props} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Typed Button
          </button>
        )}
      </Tooltip>
    </div>
  );
};

export default App;