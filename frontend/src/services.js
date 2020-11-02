import { updateRawData } from "./redux/actions";
import { doGet, doPost } from "./utils/requests";
import { showAlert, updateReduxLocalStorage } from "./utils/utils";

const defaultCallback = (callback, response, message, isSuccess=true) => {
  if (callback)
    callback(response)
  showAlert(message || "Successful", isSuccess? 'success': 'error')
}

export const loginUser = (payload, success, failure) => {
  doPost(
    "api/login/",
    payload,
    (res) => defaultCallback(success, res, "Logged in"),
    (res) => defaultCallback(failure, res, "Invalid credetials", false)
  );
};

export const logout = (success, failure) => {
  doPost(
    "api/logout/",
    {},
    (res) => defaultCallback(success, res, "Logged out"),
    (res) => defaultCallback(failure, res, "Some error occured", false)
  );
};

export const signup = (payload, success, failure) => {
  doPost(
    "api/signup/",
    payload, 
    (res) => defaultCallback(success, res, "Successfully signed in"),
    (res) => defaultCallback(failure, res, "Some error occured", false)
  );
};

export const addEditGroundService = (payload, success, failure) => {
  doPost(
    "api/add_edit_ground/",
    payload, 
    (res) => defaultCallback(success, res, "Successfully Added/Edited Ground"),
    (res) => defaultCallback(failure, res, "Failed to Add/Update ground", false)
  );
};


export const fetchGrounds = () => {
  doGet(
    'api/fetch_grounds',
    (res) => {
      res = res.map(r => {
        return {[r.id]: r}
      });
      let grounds = {}
      Object.assign(grounds, ...res)
      console.log(grounds)
      updateRawData({grounds});
    },
    (res) => defaultCallback(null, res, "Unable to fetch grounds", false)
  )
}


export const fetchUserGrounds = () => {
  doGet(
    'api/fetch_user_grounds',
    (res) => {
      res = res.map(r => {
        return {[r.id]: r}
      });
      let grounds = {}
      Object.assign(grounds, ...res)
      console.log(grounds)
      updateRawData({grounds});
    },
    (res) => defaultCallback(null, res, "Unable to fetch grounds", false)
  )
}

export const fetchGroundBookings = (payload, success) => {
  doPost(
    'api/fetch_ground_bookings/',
    payload,
    (res) => {
      updateRawData({doneBookings: res});
      success();
    },
    (res) => defaultCallback(null, res, "Unable to fetch ground bookings", false)
  )
}


export const addBooking = (payload, success) => {
  doPost(
    'api/add_booking/',
    payload,
    (res) => {
      success(res);
    },
    (res) => defaultCallback(null, res, "Unable to book a ground. Please try again later!", false)
  )
}

export const startSlot = (payload, success) => {
  doPost(
    'api/start_slot/',
    payload,
    (res) => {
      success(res);
    },
    (res) => defaultCallback(null, res, "Unable to book a ground. Please try again later!", false)
  )

}