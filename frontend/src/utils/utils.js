// import {store}
import store from "../redux/store";
import {toast} from 'react-toastify';
import { updateRawData } from "../redux/actions";


export const showAlert = (message, type = 'default', autoClose = 2000) => {
    let toastId = store.getState().rawData.toastId;
    const toastPositionObj = {1: 'top-right', 2: 'top-center', 3: 'bottom-right'};
    const statusNotificationPosition = 1
    const positionSide = toastPositionObj[statusNotificationPosition];
    if (type === 'success') {
        autoClose = 1200;
    }
    if (!toast.isActive(toastId)) {
        toastId = toast(message, {autoClose: autoClose, type, position: positionSide});
    } else {
        toast.update(toastId, {render: message, type, autoClose: autoClose, position: positionSide});
    }

    updateRawData({toastId});
};