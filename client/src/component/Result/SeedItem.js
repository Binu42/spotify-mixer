import { ListItemText } from '@material-ui/core'
import React from 'react'

const SeedItem = ({ seed, removeSeed }) => {
  const { id, name, image, type } = seed || {};
  return (
    <div className="seed-item">
      <div className="seed-image">
        <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
      </div>
      <ListItemText className="text-white" primary={<span className="seed-name">{name}</span>} secondary={type} />
      <button className="remove-seed" onClick={e => removeSeed(id, type)}></button>
    </div>
  )
}

export default SeedItem
