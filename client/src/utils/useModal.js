import {useState} from 'react'

const useModal = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true);
      };

      const handleCloseModal = () => {
        setOpenModal(false);
      };

      return {
          handleOpenModal,
          handleCloseModal,
          openModal
      }
}

export default useModal;