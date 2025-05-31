import React from 'react'
import Shopping from '../shopping/Shopping'
import defaultarray from '../Defaultarray'


function Collection() {
        const menarr=defaultarray("male");
        const womenarr=defaultarray("female");

        const finalarr=menarr.concat(womenarr);
        console.log(menarr)
        console.log(typeof(finalarr));
  return (
    <div>
      <Shopping
        category="shop"
        details={finalarr}
      ></Shopping>
    </div>
  )
}

export default Collection
