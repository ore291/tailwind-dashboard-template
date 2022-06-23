import React from 'react'
import {Link} from "react-router-dom";

const CategoryCard = ({category}) => {
  return (
    <Link to={`/categories/${category.slug}`}>
 <div className="h-40 md:h-48 rounded-md col-container border-2 shadow-md max-w-40 p-0 ">
        <img src={category.image} alt="" className="rounded-t-md w-full m-0 h-[85%] object-cover cursor-pointer" />
        <p className="text-xs whitespace-nowrap">{category.name}</p>
        

    </div>

    </Link>
   
  )
}

export default CategoryCard