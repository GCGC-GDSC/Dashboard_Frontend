import { useState } from "react";

function ClipboardCopy({ copyText }) {
  const copyButtonStyles = {
    "padding":"1rem",
    "font-size": "large",
    "cursor": "pointer",
  }
    const [isCopied, setIsCopied] = useState(false);
  
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      <div>
        <input type="text" value={copyText} readOnly style={{display:"none"}}/>
        {/* Bind our handler function to the onClick button property */}
        <button onClick={handleCopyClick} style={copyButtonStyles}>
          <span>{isCopied ? 'Copied!' : 'Copy Email'}</span>
        </button>
      </div>
    );
  }
  export default ClipboardCopy;