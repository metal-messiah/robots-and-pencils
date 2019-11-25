import React from 'react';

// Simple message that shows if failed to fetch rockets in AppComponent
const ErrorComponent: React.FC<any> = () => {
  return (
    <h1>
      Failed To Fetch Rocket Data
      <span role='img' aria-label='Dissapointed Face'>
        😞
      </span>
    </h1>
  );
};

export default ErrorComponent;
