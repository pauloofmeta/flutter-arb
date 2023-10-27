import { VSCodeProgressRing } from '@vscode/webview-ui-toolkit/react';
import React from 'react';

export const Loading = () => {
  return (
    <div>
      <VSCodeProgressRing title="Loading" />
    </div>
  );
};
