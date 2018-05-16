import { load } from './ViewerLoader'
import './style.css'

$.getJSON('/auth', (data) => {
    load(data);
})