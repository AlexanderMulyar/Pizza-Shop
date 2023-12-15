import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import moment from 'moment';
import "moment/locale/uk";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './App';
import rootReducer from './redux/rootReducer';
import reportWebVitals from './reportWebVitals';
import './scss/styles.scss'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
moment.locale('uk');
library.add(fab, fas )

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
))

root.render(
<React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
</React.StrictMode>);

reportWebVitals();
