import { FaPaw } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="paw" style={{ fontSize: '50px', margin: '0 10px', animation: 'bounce 0.6s infinite alternate' }}>
        <FaPaw className='text-success' />
      </div>
      <div className="paw" style={{ fontSize: '50px', margin: '0 10px', animation: 'bounce 0.6s infinite alternate', animationDelay: '0.2s' }}>
        <FaPaw className='text-success' />
      </div>
      <div className="paw" style={{ fontSize: '50px', margin: '0 10px', animation: 'bounce 0.6s infinite alternate', animationDelay: '0.4s' }}>
        <FaPaw className='text-success' />
      </div>
    </div>
  );
};


export default Loader;