import React from 'react'
import Auxilary from 'app/hoc/Auxilary'
import StatCell from './StatCell/StatCell'
const Stats = (props) => {
  return (
    <Auxilary>
        <h2> Overall Damage Stats For Floods 2022 (SINDH)</h2>
        <hr/>
        {Object.keys(props.stats).map(el=>(
          <Auxilary key={el}>
            <StatCell title={el} info={props.stats[el]}/>
            <hr></hr>
          </Auxilary>
        ))}   
    </Auxilary>
  )
}

export default Stats