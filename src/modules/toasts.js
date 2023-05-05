import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'
import '@/assets/css/toastify.css'

const toastSuccess = (success) => {
    toast(success, {
        autoClose: 2500,
        position: toast.POSITION.TOP_LEFT,
        transition: toast.TRANSITIONS.FLIP,
        type: toast.TYPE.SUCCESS,
        theme: toast.THEME.COLORED
    })
}
const toastError = (error) => {
    toast(error, {
        autoClose: 5000,
        position: toast.POSITION.TOP_LEFT,
        transition: toast.TRANSITIONS.FLIP,
        type: toast.TYPE.ERROR,
        theme: toast.THEME.COLORED
    })
}

const flattenErrors = (error) => {
    const errors = [];

    for (const key in error.response.data) {

        const errorMessages = error.response.data[key];

        if (key === 'non_field_errors') {
            // const fullError = errorMessages.join(' ')
            errors.push(errorMessages)
        } else {
            const fullError = key.charAt(0).toUpperCase() + key.slice(1) + ': ' + errorMessages.join(' ')
            errors.push(fullError);
        }

    }
    const flattenedErrors = errors.flat();

    return flattenedErrors
}


export default { toastSuccess, toastError, flattenErrors }