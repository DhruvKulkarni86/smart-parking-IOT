import React, { useState, useEffect } from "react"
import { database } from "./config/firebase"
import { onValue, ref } from "firebase/database"
import "./App.css"

const App = () => {
  const parkingDBRef = ref(database, "/test")
  const [parkingSpaces, setParkingSpaces] = useState("")
  useEffect(() => {
    let parkingData
    onValue(parkingDBRef, async snapshot => {
      parkingData = await snapshot.val()
      setParkingSpaces(parkingData)
    })
  }, [])

  const parkingGrid = []
  for (let i = 0; i < 1; i++) {
    parkingGrid.push(
      <ParkingSpace
        key={i}
        number={parkingSpaces.id}
        isOccupied={parkingSpaces.parked}
      />
    )
  }
  return (
    <React.Fragment>
      <h1>Smart Parking System</h1>
      <div className="parking-grid">{parkingGrid}</div>
    </React.Fragment>
  )
}

const ParkingSpace = ({ number, isOccupied }) => {
  if (isOccupied) return <div className="space red">Spot no: {number} <br/> Not Availabe</div>
  else return <div className="space green">Spot no: {number} <br/> Availabe</div>
}

export default App
