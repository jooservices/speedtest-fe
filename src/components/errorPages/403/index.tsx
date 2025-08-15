import React from 'react'

import { Button, Result } from 'antd'

function Error403(){
  return (
    <div className='gx-page-error-container'>
      <Result title='403' subTitle='Forbidden.' extra={<Button type='primary'>Go back</Button>} />
    </div>
  )
}

export default Error403
