import React from 'react'

const InfoCard = ({Icon, value, text, color}) => {
  return (
    <div className={`h-[100px] grid grid-cols-2 gap-x-0 gap-y-2 place-content-center justify-content-center py-5 px-10 lg:px-[10px] rounded-md text-white ${color}`}>
      <Icon className="h-20 w-20 text-white/20"/>
      <div className="flex flex-col justify-between items-end">
          <span className="text-3xl font-medium">{value}</span>
          <p className="text-lg font-semibold whitespace-nowrap ">{text}</p>
      </div>

    </div>
  )
}

export default InfoCard