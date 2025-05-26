import { motion, AnimatePresence } from 'framer-motion';

/**
 * A reusable popup component for displaying photos
 */
const PhotoPopup = ({ image, isOpen, onClose, alt = "Image" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 flex items-center justify-center"
          onClick={onClose} // Close when clicking outside
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl bg-white rounded-2xl p-5 relative"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-white text-gray-800 hover:bg-gray-100 rounded-full shadow-md border border-gray-300 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img src={image} alt={alt} className="w-full h-auto rounded-xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoPopup;