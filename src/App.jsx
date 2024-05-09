import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [page, setPage] = useState(0)
  const [rowCount, setRowCount] = useState(10)
  const [users, setUsers] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalInformation, setModalInformation] = useState(Object)

  const handleNegative = () => {
    if (page < 1) {
      setPage(0)
    }
    else (
      setPage(page - 1)
    )
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://hiring-api.simbuka.workers.dev/?page=${page}&size=${rowCount}`);
      const data = await response.json();
      return data
    }

    getData().then((data) => {
      setUsers(data)
    })
  }, [page, rowCount])

  useEffect(() => {
    if (page < 1) {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }
  }, [page])

  return (
    <main className="container">
        <div className="wrapper">

          <p>Page: {page}</p>
          <table className="data-table">
            <thead>
              <tr>
                <th className="data-table__number">Nr.</th>
                <th className="data-table__name">First Name</th>
                <th className>Last Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td className='table_actions'><button onClick={() => { setShowModal(true); setModalInformation(user) }}>More information</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="actions">
            <button onClick={() => handleNegative()} className={`${disabled ? 'disabled' : ''} button`} disabled={disabled}>Previous</button>
            <button className="button" onClick={() => setPage(page + 1)}>Next</button>
            <select onChange={(e) => setRowCount(e.target.value)}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>


        </div>
        <dialog open={showModal}>
          <button onClick={() => setShowModal(false)}>Close</button>
          <ul>
            <li>Identification number: {modalInformation.customerIdentificationCode}</li>
            <li>First name: {modalInformation.firstName}</li>
            <li>Last name: {modalInformation.lastName}</li>
            <li>Birth date: {modalInformation.birthDate}</li>
            <li>Gender: {modalInformation.gender}</li>
          </ul>

        </dialog>
    </main>
  )
}

export default App
