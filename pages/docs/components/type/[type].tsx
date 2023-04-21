import { GetStaticProps } from 'next';
import React from 'react'

const Type = () => {
  return (
    <div>Type</div>
  )
}

export default Type


const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
export { getStaticProps };