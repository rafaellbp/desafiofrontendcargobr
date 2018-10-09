import  {combineReducers} from 'redux'
import desafioReducers from '../components/desafio/DesafioReducer'
const rootReducer = combineReducers({
    desafio: desafioReducers

});

export default rootReducer