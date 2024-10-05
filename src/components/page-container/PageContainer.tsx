import React, { PropsWithChildren } from 'react'
import style from './PageContainer.module.css'
const  PageContainer:React.FC<PropsWithChildren>=({children})=> {
  return (
      < div className={style.root}>
        {children}
      </div>
  )
}

export default PageContainer;
