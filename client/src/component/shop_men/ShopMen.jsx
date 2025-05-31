import React, { useEffect, useState } from 'react';
import Shopping from '../shopping/Shopping';
import Defaultarray from '../Defaultarray';

function ShopMen() {
    const menArray=Defaultarray("male");

    return (
        <Shopping
            category="men"
            details={menArray}
        />
    );
}

export default ShopMen;

