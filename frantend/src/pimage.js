import { Upload, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import './App.css'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  constructor(props){
    super(props)
  
  this.state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: props.pw.displayName,
        status: 'done',
        url: props.pw.photoURL,
      },
    ],
  };
  }
  handleCancel = () => this.setState({ previewVisible: false });
  
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    // const uploadButton = (
    //   <div>
    //     <Icon type="plus"  />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {/* {fileList.length >= 1 ? null : uploadButton} */}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} className="modalpad">
          <img alt="example" style={{ width: '100%',borderRadius:"0%",padding:"0px"}} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall