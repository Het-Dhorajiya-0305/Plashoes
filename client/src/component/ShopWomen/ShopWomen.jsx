import React from 'react'
import Shopping from '../shopping/Shopping'
import defaultarray from '../Defaultarray'

function ShopWomen() {
    const womenArray=defaultarray("female");
  return (
    <div>

        <Shopping
            category="women"
            details={womenArray}
        ></Shopping>
    </div>
  )
}

export default ShopWomen
