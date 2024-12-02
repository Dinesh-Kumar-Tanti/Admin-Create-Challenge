import React from 'react' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CreateChallange from './components/Admin/CreateChallenge'
import ChallengeDetails from './components/DetailPage/ChallengeDetails'
import HomePage from './Pages/HomePage'
import ScrollToTop from './ScrollToTop'
import Error from './Pages/ErrorPage'


const App = () => {
  return (
      <BrowserRouter>
      <ScrollToTop /> 
      <Header/>
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route path='create-challenge' element={<CreateChallange/>} />
        <Route path="edit-challenge">
                    <Route path="" element={<Error />} />
                    <Route path=":challengeId" element={<CreateChallange />} />
                </Route>
        <Route path="details">
                    <Route path="" element={<Error />} />
                    <Route path=":challengeId" element={<ChallengeDetails />} />
                </Route>
        <Route path='*' element={<Error/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App

