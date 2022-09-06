import { Image, Upload } from 'antd';
import React, { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import styles from './index.less';
import { RcFile } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop'

const Page: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])
  const [previewSrc, setPreviewSrc] = useState<string>('')
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }: any) => {
    console.log('onChange', newFileList);
    setFileList(newFileList)
  }
  const beforeUpload = (file: any) => {
    console.log('beforeUpload', file)
    return true
  }
  const onPreview = async (file: UploadFile) => {
    console.log('onPreview', file);
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    console.log('src', src);
    setPreviewSrc(src)
  }
  return (
    <div>
      <h1 className={styles.title}>上传</h1>
      <ImgCrop rotate beforeCrop={beforeUpload}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          fileList={fileList}
          // beforeUpload={beforeUpload} // 若添加裁剪，beforeUpload会上传失效，应该加在ImgCrop的beforeCrop
          onChange={onChange}
          onPreview={onPreview}
          listType="picture-card"
        >
          上传图片
        </Upload>
      </ImgCrop>
      <Image style={{ display: 'none' }} preview={{
        src: previewSrc,
        visible: Boolean(previewSrc),
        onVisibleChange: (value) => {
          if (!value) {
            setPreviewSrc('')
          }
        }
      }} />
    </div>
  );
}


export default Page
