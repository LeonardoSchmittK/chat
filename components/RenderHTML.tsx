import React from 'react';
import { Platform, Text } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

interface RenderHTMLProps {
  txt?: string; // Make txt optional
}

const RenderHTML: React.FC<RenderHTMLProps> = ({ txt = '' }) => { // Use default parameter
  return (
    <>
      {Platform.OS === 'web' ? (
        <div dangerouslySetInnerHTML={{ __html: txt }} style={{ width: '100%', fontFamily: 'Arial' }} />
      ) : (
        <Text>{txt}</Text>
      )}
    </>
  );
};

export default React.memo(RenderHTML); // Wrap with memo if needed