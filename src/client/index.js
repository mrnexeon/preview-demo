import { load } from './ViewerLoader'

$.getJSON('/auth', (data) => {
    load(data);
})