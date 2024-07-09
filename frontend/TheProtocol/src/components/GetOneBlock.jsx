import { useState } from 'react';
import { getBlocks } from '../services/HttpClient';

const GetOneBlock = () => {
  const [blocks, setBlocks] = useState([]);
  const [blockIndex, setBlockIndex] = useState('');
  const [filteredBlock, setFilteredBlock] = useState(null);

  const handleLoadBlocks = async () => {
    try {
      const response = await getBlocks();
      console.log('Fetched blocks:', response);
      if (response && response.success && Array.isArray(response.data)) {
        setBlocks(response.data);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  const handleBlockIndexChange = (event) => {
    setBlockIndex(event.target.value);
  };

  const handleSearch = () => {
    const block = blocks.find(
      (block) => block.blockIndex === parseInt(blockIndex, 10)
    );
    setFilteredBlock(block);
  };

  return (
    <div>
      <button onClick={handleLoadBlocks}>Load Blocks</button>
      <label>
        <input
          placeholder='Block Number?'
          type='number'
          value={blockIndex}
          onChange={handleBlockIndexChange}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
      <div>
        {filteredBlock ? (
          <div>
            <p>Timestamp: {filteredBlock.timestamp}</p>
            <p>Block Index: {filteredBlock.blockIndex}</p>
            <p>Last Hash: {filteredBlock.lastHash}</p>
            <p>Hash: {filteredBlock.hash}</p>
            <p>Nonce: {filteredBlock.nonce}</p>
            <p>Difficulty: {filteredBlock.difficulty}</p>
            <p>Data: {JSON.stringify(filteredBlock.data)}</p>
          </div>
        ) : (
          <p>No block found for the given index</p>
        )}
      </div>
    </div>
  );
};

export default GetOneBlock;
