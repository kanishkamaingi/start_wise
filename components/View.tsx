import React from 'react'
import Ping from './Ping'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'
import { unstable_after as after} from 'next/server'
const View = async ({id}: {id: string}) => {
    const {views : totalViews} = await client.fetch(STARTUP_VIEWS_QUERY, {id})
  
    after( async() =>
    await writeClient
          .patch(id)
          .set( {views: totalViews + 1})
          .commit())
    return (
        <div className='fixed left-4 bottom-4'>
        <div className='absolute -top-2 -right-2'>
          <Ping />
        </div>
      
        <p className='view-text'>
          <span className='font-black'>Views: {totalViews}</span>
        </p>
      </div>
      
  )
}

export default View
