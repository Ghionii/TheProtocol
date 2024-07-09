import { useState, React } from 'react';
import { getBlocks } from '../services/HttpClient';

export const RetrieveBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [showBlocks, setShowBlocks] = useState(false);

  const handleLoadBlocks = async () => {
    try {
      const blocks = await getBlocks();
      setBlocks(blocks.data);
      setShowBlocks(true);
    } catch (error) {
      console.error('Error fetching blocks', error);
    }
  };

  const handleToggleBlocks = () => {
    setShowBlocks(!showBlocks);
  };

  return (
    <div className='theWrapper'>
      <div className='buttonWrapper'>
        <h3 className='insideText'>Take a look at our current blocks!</h3>
        <button
          className='insideText'
          onClick={showBlocks ? handleToggleBlocks : handleLoadBlocks}
        >
          {showBlocks ? 'Hide Blockchain Data' : 'Show Blockchain Data'}{' '}
        </button>
      </div>
      {showBlocks && (
        <div className='blockchainWrapper'>
          <ul>
            {blocks.map((block, index) => (
              <li key={index} className='block-Container'>
                Timestamp: {block.timestamp}
                <br />
                Block Index: {block.blockIndex}
                <br />
                Hash: {block.hash}
                <br />
                Last Hash: {block.lastHash}
                <br />
                Nonce: {block.nonce}
                <br />
                Difficulty: {block.difficulty}
                <br />
                Data: {JSON.stringify(block.data)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
