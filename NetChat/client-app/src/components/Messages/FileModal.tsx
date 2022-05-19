import React, { useContext, useState } from 'react'
import { Button, Icon, Input, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite';

interface IProps
{
    uploadFile: (file: Blob | null) => void
}

export const FileModal :React.FC<IProps> = observer(({uploadFile}) => {

  const rootStore = useContext(RootStoreContext)
  const {isModalVisible, showModal } = rootStore.messageStore
  const [image, setImage] = useState<Blob | null>(null)

  console.log(isModalVisible)

  const addFile = (event: any) => {
    //console.log(event.target.files)
    const file = event.target.files[0]
    setImage(file)
  }


  const sendFile = () => {
    //console.log(image)
    uploadFile(image)
    showModal(false)
    clearFile()
  }

  const clearFile = () => setImage(null)

  return (
    
    <Modal basic open={isModalVisible} onClose={() => showModal(false)}>
        <ModalHeader>
            Select an Image File
        </ModalHeader>
        <ModalContent>
            <Input fluid label="File types: jpg, png" name="file" type='file'
            onChange={addFile}/>
        </ModalContent>
        <ModalActions>
          <Button color='green' inverted onClick={sendFile}>
            <Icon name='checkmark' /> Send            
          </Button>
          <Button color="red" inverted onClick={() => showModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
        </ModalActions>
    </Modal>
  )
})
