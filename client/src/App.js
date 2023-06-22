import { Routes, Route } from 'react-router-dom';
import Create from './components/create';
import Edit from './components/edit';
import Navbar from './components/navbar'

const App = () => {
    return (
        <div>
          <Navbar />
          <Routes>
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </div>
    )
}

export default App;