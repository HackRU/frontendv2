import React from 'react'

function DirectorView(userData : any) {
  return (
    <div>
        <h1>{userData.first_name}</h1>
    </div>
  )
}

export default DirectorView