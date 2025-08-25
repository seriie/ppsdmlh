import React from 'react';
import Sidebar from '@/components/admin/sidebar/Sidebar';
import Layout from './Layout';

const page = () => {
  return (
    <div>
      <Layout>  
        <Sidebar />
      </Layout>
    </div>
  )
}

export default page;