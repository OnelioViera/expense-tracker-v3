import React from 'react'

const BudgetItem = ({budget}) => {
  return (
    <div>
      <div>
        <h2 className='text-3xl'>{budget?.icon}</h2>
      </div>
    </div>
  )
}

export default BudgetItem
