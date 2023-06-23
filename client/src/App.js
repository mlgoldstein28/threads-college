import { Routes, Route } from 'react-router-dom';
import Create from './components/create';
import Edit from './components/edit';
import Navbar from './components/navbar'
import RecordList from './components/recordList';

const App = () => {
    return (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<RecordList />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </div>
    )
}

export default App;